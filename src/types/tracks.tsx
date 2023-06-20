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
    queryable?: boolean
    removable?: boolean;
    autoHeight?: boolean;
    minHeight?: number;
    maxHeight?: number;
    order?: number;
    color?: string;
    
    // IGV options
    reader?: any;
    decode?: any;
}
