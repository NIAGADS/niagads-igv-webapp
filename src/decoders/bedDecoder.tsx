import igv from "igv/dist/igv.esm";
import { BedXYFeatureType } from "@browser-types/features";

export function decodeBedXY(tokens: any, header: any) {
    if (tokens.length < 3) return undefined

    const gffTags = header && header.gffTags

    const chr = tokens[0]
    const start = parseInt(tokens[1])
    const end = tokens.length > 2 ? parseInt(tokens[2]) : start + 1
    if (isNaN(start) || isNaN(end)) {
        return new igv.DecodeError(`Unparsable bed record.`)
    }
    // const feature = new igv.UCSCBedFeature({chr: chr, start: start, end: end, score: 1000})
    let feature: BedXYFeatureType = {
        chrom: chr,
        chromStart: start,
        chromEnd: end,
        score: 1000
    }

    const columns = header.columnNames
    //Get x and y out of format
    let x = 0
    let y = 0
    const format = header.format
    let match = format.match(/bed(\d{1,2})\+(\d{1,2})/)
    if(match){
        x = parseInt(match[1])
        y = parseInt(match[2])
    }

    //parse standard columns
    feature = parseStandardFeatures(feature, x, tokens)
    //parse optional columns
    feature = parseOptionalFeatures(feature, tokens, x, columns)

    // @ts-ignore
    feature = new BedXYFeature(feature)

    
    return feature
}

function parseStandardFeatures(feature: BedXYFeatureType, x: number, tokens: any): BedXYFeatureType {
    let counter = 4;
    try {

        if (counter > x) return feature
        if (!feature.name) {
            feature.name = tokens[3] === '.' ? '' : tokens[3]
        }
        counter++

        if (counter > x) return feature
        feature.score = tokens[4] === '.' ? 0 : Number(tokens[4])
        if (isNaN(feature.score)) {
            return feature
        }
        counter++

        if (counter > x) return feature
        feature.strand = tokens[5]
        if (!(feature.strand === '.' || feature.strand === '+' || feature.strand === '-')) {
            return feature
        }
        counter++

        if (counter > x) return feature
        feature.cdStart = parseInt(tokens[6])
        if (isNaN(feature.cdStart)) {
            return feature
        }
        counter++

        if (counter > x) return feature
        feature.cdEnd = parseInt(tokens[7])
        if (isNaN(feature.cdEnd)) {
            return feature
        }
        counter++

        if (counter > x) return feature
        if (tokens[8] !== "." && tokens[8] !== "0")
            feature.color = igv.IGVColor.createColorString(tokens[8])

        return feature
    } catch (e) {
            console.error(e)
            return null
    }
}

function parseOptionalFeatures(feature: BedXYFeatureType, tokens: any, x:number, columns: any) {
    //go through tokens and add optional columns to feature
    let optionalFeatures: any = {}
    for(let i = x; i < columns.length; i++){
        optionalFeatures[columns[i]] = tokens[i]
    }

    feature.info = optionalFeatures
    return feature
}

//@ts-ignore
class BedXYFeature implements BedXYFeatureType{

    constructor(properties: BedXYFeatureType) {
        Object.assign(this, properties)
    }

    getAttributeValue(attributeName: string): any {
        if (this.hasOwnProperty(attributeName)) {
            //@ts-ignore
            return this[attributeName]
            //@ts-ignore
        } else if (this.info.hasOwnProperty(attributeName)) {
            //@ts-ignore
            return this.info[attributeName]
        }
        else {
            return null
        }
    }
}