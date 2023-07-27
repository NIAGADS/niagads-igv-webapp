import { ROISet, TrackBaseOptions } from "./tracks"

export interface ReferenceFrame {
    chr: string,
    start: number,
    end: number,
    bpPerPixel?: number,
    genome?: any,
    id?: string,
    locusSearchString?: string,
}

export type BrowserChangeEvent = 
"initialload"
| "locuschange"
| "updateuserdefinedroi"
| "trackremoved"
| "loadsession"
| "savesession"
| "loadfromqueryparams"
| "none"

export interface QueryParams {
    tracks?: TrackBaseOptions[],
    roi?: ROISet[],
    locus?: string,
}