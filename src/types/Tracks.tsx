export interface TrackBaseOptions {
    removable?: boolean;
    height?: string;
    visibilityWindow?: number;
    type: string;
    name: string;
    description: string;
    oauthToken?: any;
    queryable?: boolean
    autoHeight?: boolean;
    minHeight?: number;
    maxHeight?: number;
    order?: number;
    color?: string;
    indexed?: boolean;
    format?: string;
    indexURL?: string;
    url: string;
}
//do defaults


//removed properties
// reader?: any;
// supportsWholeGenome?: boolean;
// displayMode?: string;
// id: string;
// colorBy?: any;
// queryable?: boolean; // query webservice when scrolling
// expandQuery?: boolean; // expand the query to the whole genome & cache?
// sourceType?: string;
// feature_type?: string;
// endpoint?: string;
// consortium?: string;
// label?: string;
// track?: string;
// track_type?: string;
// data_source?: string;
// track_type_display?: string;
// metadata?: any;
// biosample_characteristics?: any;
// repository?: string;
// experimental_design?: any;
