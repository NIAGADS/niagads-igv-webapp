import { Session, TrackBaseOptions, IGVTrackOptions, ROIFeature, ROISet } from "@browser-types/tracks";
import { decodeBedXY } from "@decoders/bedDecoder";
import { resolveTrackReader, getLoadedTrackIDs, getLoadedTracks } from "./tracks";
import { get } from "lodash"
import { BrowserChangeEvent, ReferenceFrame } from "@browser-types/browserObjects";
import { DEFAULT_FLANK } from "@data/_constants";

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

export const cleanTracks = (tracks: TrackBaseOptions[]): TrackBaseOptions[] => {
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

export const createLocusString = (referenceFrameList: ReferenceFrame[]): string => {
  const frame = referenceFrameList[0]
  return `${frame.chr}:${frame.start}-${frame.end}`
}

export const addDefaultFlank = (locus: string) => {
  let [chr, range] = locus.split(":")
  let [start, end] = range.split("-")

  let numStart = parseInt(start) - DEFAULT_FLANK
  let numEnd = parseInt(end) + DEFAULT_FLANK

  return `${chr}:${numStart}-${numEnd}`

}

export const createROIFromLocusRange = (roiString: string): ROISet[] => {
     const [chr, range] = roiString.split(':')
     const [start, end] = range.split('-')

     const feature: ROIFeature = {
      chr: chr,
      start: parseFloat(start),
      end: parseFloat(end)
     }

     return [{
      features: [feature],
      isUserDefined: true
     }]
}