import get from "lodash.get";
import { ALWAYS_ON_TRACKS } from "../../data/_constants";
import { VariantServiceReader } from "../components/GenomeBrowser/IGV/Readers";
import { GWASServiceReader } from "../components/GenomeBrowser/IGV/Readers";

export const getTrackID = (trackView: any) => {
    const track = trackView.track;
    return "id" in track ? track.id : track.config.id;
};

export const getLoadedTracks = (browser: any): string[] =>
    get(browser, "trackViews", [])
        .map((view: any) => getTrackID(view))
        .filter((track: string) => !ALWAYS_ON_TRACKS.includes(track));

export const trackIsLoaded = (config: any, browser: any) => getLoadedTracks(browser).includes(config.id);

// we want to find track by ID b/c some names may be duplicated; so modeled after:
// https://github.com/igvteam/igv.js/blob/0dfb1f7b02d9660ff1ef0169899c4711496158e8/js/browser.js#L1104
export const removeTrackById = (trackId: string, browser: any) => {
    const trackViews = get(browser, "trackViews", []);
    const trackView = trackViews.filter((view: any) => getTrackID(view) === trackId);
    browser.removeTrack(trackView[0].track);
};

export const resolveTrackReader = (trackType: string, config: any): any => {
    switch (trackType) {
        case "gwas_service":
            return new GWASServiceReader(config);
        case "variant_service":
            return new VariantServiceReader(config);
        default:
            return null;
    }
};