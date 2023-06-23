import igv from "igv/dist/igv.esm";

const EXPECTED_BED_FIELDS = ["chr", "start", "end", "name", "score", "strand", "cdStart", 
    "cdEnd", "color", "blockCount", "blockSizes", "blockStarts"]

export function decodeBedXY(tokens: any, header: any) {

    // Get X (number of standard BED fields) and Y (number of optional BED fields) out of format
    let match = header.format.match(/bed(\d{1,2})\+(\d+)/)
    const X = parseInt(match[1])
    const Y = parseInt(match[2])

    if (tokens.length < 3) return undefined

    const chr = tokens[0]
    const start = parseInt(tokens[1])
    const end = tokens.length > 2 ? parseInt(tokens[2]) : start + 1
    if (isNaN(start) || isNaN(end)) {
        return new igv.DecodeError(`Unparsable bed record.`)
    }

    let feature = new BedXYFeature(chr,start,end);

    if (X > 3) { // parse additional standard BED (beyond chr, start, end) columns
        parseStandardFeatures(feature, X, tokens)
    }

    // parse optional columns
    parseOptionalFeatures(feature, tokens, X, header.columnNames)


    return feature
}

function parseBedToken(field: string, token: string) {
    switch(field) {
        case "name":
            return token === "." ? '' : token
        case "score":
            if (token === ".") return 0
            return Number(token)
        case "strand":
            return [".", "+", "-"].includes(token) ? token : null
        case "cdStart":
        case "cdEnd":
            return parseInt(token)
        case "color":
            if (token === "." ||  token === "0") return null
            return igv.IGVColor.createColorString(token)
        default:
            return token
    }
}

function parseStandardFeatures(feature: BedXYFeature, X: number, tokens: any) {
    // building an object { EXPECTED_FIELDS[index]: token[index]}
    try {
        let attributes: any = {}
        for (let index = 3; index < X; index++) {
            let field:string = EXPECTED_BED_FIELDS[index]
            let value = parseBedToken(field, tokens[index])
            if (value === null) continue
            if (typeof(value) === "number" && isNaN(value)) {
                continue
            }
            attributes[field] = value
        }

        // add to the feature and return
        feature.setAdditionalAttributes(attributes)
        return
    } catch (e) {
            console.error(e)
            return
    }
}

function parseOptionalFeatures(feature: BedXYFeature, tokens: any, X:number, columns: any) {

    //go through tokens and perform minimal parsing add optional columns to feature.info
    let optionalFeatures: any = {}
    for(let i = X; i < columns.length; i++){
        let optFeature = tokens[i]
        //check to see if the feature is a number in a string and convert it
        if(!isNaN(optFeature) && typeof(optFeature) !== 'number'){
            let num = parseFloat(optFeature)
            Number.isInteger(num) ? parseInt(optFeature) : optFeature = num
        }
        if(optFeature === '.') optFeature = null
        
        optionalFeatures[columns[i]] = optFeature
    }

    feature.setAdditionalAttributes({ "info": optionalFeatures })
    return
}


class BedXYFeature {
    chr: string;
    start: number;
    end: number;
    score: number;
    info: any;

    constructor(chr: string, start: number, end: number, score=1000) {
        this.start = start;
        this.end = end;
        this.chr = chr;
        this.score = score;
    }

    setAdditionalAttributes(attributes: any) {
        Object.assign(this, attributes)
    }

    getAttributeValue(attributeName: string): any {
        const key = attributeName as keyof BedXYFeature
        if (this.hasOwnProperty(key)) {
            return this[key]
        } else if (this.info.hasOwnProperty(key)) {
            return this.info[key]
        }
        else {
            return null
        }
    }
}