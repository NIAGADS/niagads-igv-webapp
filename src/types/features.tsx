export interface BedXYFeature {
    chrom: string;
    start: number;
    end: number;
    name?: string;
    score?: number;
    strand?: string;
    cdStart?: number;
    cdEnd?: number;
    color?: string;
    blockCount?: number;
    blockSizes?: any; //TODO: could be list?
    blockStarts?: any; //TODO: could be list?
    info?: {[key: string]: string | number | boolean}
}