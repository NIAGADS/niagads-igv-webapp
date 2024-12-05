import get from "lodash.get";
import { TrackBaseOptions } from "../types/tracks";
import { ALWAYS_ON_TRACKS } from "../common/_constants";
import VariantServiceReader from "../readers/VariantServiceReader";
import GWASServiceReader from "../readers/GWASServiceReader";

export const getTrackID = (trackView: any) => {
	const track = trackView.track;
	return "id" in track ? track.id : track.config.id;
};

export const getLoadedTrackIDs = (browser: any): string[] =>
	get(browser, "trackViews", [])
		.map((view: any) => getTrackID(view))
		.filter((track: string) => !ALWAYS_ON_TRACKS.includes(track));

export const getLoadedTracks = (browser: any): TrackBaseOptions[] =>
	get(browser, "trackViews", [])
		.map((view: any) =>
			view.track.hasOwnProperty("config") ? view.track.config : view.track
		)
		.filter(
			(track: any) =>
				!ALWAYS_ON_TRACKS.includes(track.id) &&
				!(track.type === "sequence")
		);

export const trackIsLoaded = (config: any, browser: any) =>
	getLoadedTrackIDs(browser).includes(config.id);

// we want to find track by ID b/c some names may be duplicated; so modeled after:
// https://github.com/igvteam/igv.js/blob/0dfb1f7b02d9660ff1ef0169899c4711496158e8/js/browser.js#L1104
export const removeTrackById = (trackId: string, browser: any) => {
	const trackViews = get(browser, "trackViews", []);
	const trackView = trackViews.filter(
		(view: any) => getTrackID(view) === trackId
	);
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

export const removeTracks = (browser: any) => {
	const loadedTracks = getLoadedTrackIDs(browser);
	// if any tracks are loaded, remove them
	if (Object.keys(loadedTracks).length !== 0) {
		for (const id of loadedTracks) {
			removeTrackById(id, browser);
		}
	}
};

export const removeTrackFromList = (
	tracks: TrackBaseOptions[],
	removedTrack: TrackBaseOptions
): TrackBaseOptions[] => {
	for (let i = 0; i < tracks.length; i++) {
		if (tracks[i].id === removedTrack.id) {
			tracks.splice(i, 1);
		}
	}
	return tracks;
};

export const convertStringToTrackNames = (trackString: string): string[] => {
	const tracks = trackString.split(",");
	return tracks;
};

export const selectTracksFromURLParams = (
	availableTracks: TrackBaseOptions[],
	URLTracks: string[]
): TrackBaseOptions[] => {
	const selectedTracks: TrackBaseOptions[] = [];
	for (const trackName of URLTracks) {
		for (const track of availableTracks) {
			if (track.id === trackName) selectedTracks.push(track);
		}
	}
	return selectedTracks;
};
