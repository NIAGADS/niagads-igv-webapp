import igv from "igv/dist/igv.esm";
// do not need the type; remove import, but leave in case we want it for rendering the tracks
import { BedXYFeature as BedXYFeatureType } from "@browser-types/features";

const EXPECTED_BED_FIELDS = ["chr", "start", "end", "score", "name", "strand", "cdStart", 
    "cdEnd", "color", "blockCount", "blockSizes", "blockStarts"]

export function decodeBedXY(tokens: any, header: any) {

    // Get X (number of standard BED fields) and Y (number of optional BED fields) out of format
    let match = header.format.match(/bed(\\d{1,2})\\+(\\d+)/)
    const X = parseInt(match[1])
    const Y = parseInt(match[2])

    if (tokens.length < 3) return undefined

    const chr = tokens[0]
    const start = parseInt(tokens[1])
    const end = tokens.length > 2 ? parseInt(tokens[2]) : start + 1
    if (isNaN(start) || isNaN(end)) {
        return new igv.DecodeError(`Unparsable bed record.`)
    }

    // const feature = new igv.UCSCBedFeature({chr: chr, start: start, end: end, score: 1000})
    let feature = new BedXYFeature(chr,start,end);

    // parse standard columns
    if (X > 3) { // parse additional standard BED (beyond chr, start, end) columns
        feature = parseStandardFeatures(feature, X, tokens)
    }

    // parse optional columns
    feature = parseOptionalFeatures(feature, tokens, X, header.columnNames)

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

function parseStandardFeatures(feature: BedXYFeature, X: number, tokens: any): BedXYFeature {
    // loop with index from 3 to X - 1
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

    } catch (e) {
            console.error(e)
            return null
    }
}

function parseOptionalFeatures(feature: BedXYFeature, tokens: any, X:number, columns: any): BedXYFeature {
    //go through tokens and add optional columns to feature

    // some token parsing
    // test if tokens is a number and if so, change it to a number?
        // do we want to differentiate between floats & integers
        // if a number is NaN? leave as is for now
    // change all "." to null and store it    
    // anything else you think of
    let optionalFeatures: any = {}
    for(let i = X; i < columns.length; i++){
        optionalFeatures[columns[i]] = tokens[i]
    }

    feature.setAdditionalAttributes({"info":optionalFeatures})
    return feature
}


class BedXYFeature {
    chrom: string;
    start: number;
    end: number;
    score: number;
    info: any;

    constructor(chr: string, start: number, end: number, score=1000) {
        this.start = start;
        this.end = end;
        this.chrom = chr;
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