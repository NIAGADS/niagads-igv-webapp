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
    color?: string; //if a function, don't export 

    queryable?: boolean
}

export interface IGVTrackOptions extends TrackBaseOptions {
    //IGVTrackOptions
    removable?: boolean;
    reader?: any;
    decode?: any;
}

export interface Session {
    tracks: TrackBaseOptions[]

    //TODO: currently optional because functionality isn't built yet but will be required in the future
    reference?: any
    roi?: any
    locus?: any
}