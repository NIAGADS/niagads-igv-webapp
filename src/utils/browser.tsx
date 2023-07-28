import { Session, TrackBaseOptions, IGVTrackOptions, ROIFeature, ROISet } from "@browser-types/tracks";
import { decodeBedXY } from "@decoders/bedDecoder";
import { resolveTrackReader, getLoadedTrackIDs, getLoadedTracks } from "./tracks";
import { get } from "lodash"
import { BrowserChangeEvent, ReferenceFrame } from "@browser-types/browserObjects";

const ALWAYS_ON_TRACKS = ["ideogram", "ruler", "sequence", "ENSEMBL_GENE"];

// functions for maninpulating IGV browser object
export const loadTrack = async (config: any, browser: any) => {
    await browser.loadTrack(config);
};

export const loadTracks = (tracks: TrackBaseOptions[], browser: any) => {
  for (let track of tracks as IGVTrackOptions[]) {

      if (track.type.includes("_service")) {
        track.reader = resolveTrackReader(track.type, {
          endpoint: track.url,
          track: track.id,
        });
      }
      if("format" in track) {
        if(track.format.match("^bed\\d{1,2}\\+\\d+$") != null) { // does it match bedX+Y?
          track.decode = decodeBedXY
        }
      }
      // load
      browser.loadTrack(track)
  }
}

export const getTracksForSession = (browser: any, availableTracks: TrackBaseOptions[]): TrackBaseOptions[] => {
  const loadedTracks: string[] = getLoadedTrackIDs(browser)
  const tracks: TrackBaseOptions[] = []
  for(let trackID of loadedTracks){
    for(let track of availableTracks){
      if(trackID === track.id) tracks.push(track)
    }
  }

  return tracks
}

export const removeFunctionsInTracks = (tracks: TrackBaseOptions[]): TrackBaseOptions[] => {
  //remove sequence
  tracks = tracks.filter(track => (track.type !== "sequence"))
  
  //remove refereence object
  tracks = tracks.filter(track => (track.id !== "reference"))

  //remove any functions
  for(let track of tracks) {
    for(let prop in track) {
      if(typeof prop === 'function') delete track[prop];
    }
  }
  return tracks
}


export const removeNonReferenceTracks = (tracks: TrackBaseOptions[], browser: any) => {
  for(let track of tracks) {
    if(track.id !== "REFSEQ_GENE" && track.id !== "ENSEMBL_GENE"){
      browser.removeTrackByName(track.name)
    }
  }
}

export const createLocusString = (referenceFrameList: ReferenceFrame[]): string => {
  const frame = referenceFrameList[0]
  return `${frame.chr}:${frame.start}-${frame.end}`
}