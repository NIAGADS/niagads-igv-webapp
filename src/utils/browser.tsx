import { Session, TrackBaseOptions, IGVTrackOptions } from "@browser-types/tracks";
import { decodeBedXY } from "@decoders/bedDecoder";
import { resolveTrackReader } from "./tracks";
import { get } from "lodash"
import { ReferenceFrame } from "@browser-types/browserObjects";

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

export const createSessionObj = (tracks: TrackBaseOptions[]): Session => {

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

  //TODO: locus and roi are currently set to default values
  let sessionObj: Session = {
    tracks: tracks,
    roi: [],
    locus: "chr19:1,038,997-1,066,572",
  }

  return sessionObj
}

export const removeNonReferenceTracks = (tracks: TrackBaseOptions[], browser: any) => {
  for(let track of tracks) {
    if(track.id !== "REFSEQ_GENE" && track.id !== "ENSEMBL_GENE"){
      browser.removeTrackByName(track.name)
    }
  }
}

export const updateSessionLocus = (locusString: string, setSessionJSON: any) => {
  //assumes one reference frame
  //function gets called once on the beginning of the drag and once upon completion
  //Also gets called any other time the the locus is updated
  setSessionJSON((previousSessionJSON: Session) => {
    previousSessionJSON.locus = locusString
    //use spread to create new object and trigger rerender
    return previousSessionJSON
  })
}

export const createLocusString = (referenceFrameList: ReferenceFrame[]): string => {
  const frame = referenceFrameList[0]
  return `${frame.chr}:${frame.start}-${frame.end}`
}