export const GENOME_BUILD = "GRCh38"
export const USE_PROXY = true

export const DEFAULT_FLANK = 1000
export const ALWAYS_ON_TRACKS = ["ideogram", "ruler", "sequence", "ENSEMBL_GENE"];

export const NIAGADS_GENOMICSDB_URL = "https://www.niagads.org"
    + (GENOME_BUILD.endsWith("38") ? "/genomics" : "/genomics37")
export const FEATURE_INFO_BASE_URL = NIAGADS_GENOMICSDB_URL + "/app/record"
export const FEATURE_SEARCH_ENDPOINT= (USE_PROXY ? "" : NIAGADS_GENOMICSDB_URL) + "/service/track/feature?id="
