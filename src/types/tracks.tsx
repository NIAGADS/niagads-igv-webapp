export interface TrackBaseOptions {
    // required properties from user
    id: string;
    type: string;
    name: string;
    description: string;
    format: string;
    url: string;
    indexURL?: string;
    indexed?: boolean;

    // optional from user for custom rendering
    height?: string;
    visibilityWindow?: number;
    oauthToken?: any;
    autoHeight?: boolean;
    minHeight?: number;
    maxHeight?: number;
    order?: number;
    color?: string; //if a function don't export 
    
    // IGV options IGVTrackOptions
    queryable?: boolean //out
    removable?: boolean;
    reader?: any; //out
    decode?: any; //out
}
