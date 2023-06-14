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
    reader?: any;
    id: string;
}
