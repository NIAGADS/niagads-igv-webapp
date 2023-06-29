import { Session, TrackBaseOptions } from "@browser-types/tracks";
import { decodeBedXY } from "@decoders/bedDecoder";
import { resolveTrackReader } from "./tracks";

// functions for maninpulating IGV browser object

export const loadTrack = async (config: any, browser: any) => {
    await browser.loadTrack(config);
};

export const loadConfigTracks = (tracks: TrackBaseOptions[], browser: any) => {
    for (let track of tracks) {
        //take toJSON function 
        //maybe change type to allow reader
        if (track.type.includes("_service")) {
          track.reader = resolveTrackReader(track.type, {
            endpoint: track.url,
            track: track.id,
          });
        }
        if("format" in track){
          if(track.format.match("^bed\\d{1,2}\\+\\d+$") != null){ // does it match bedX+Y?
            track.decode = decodeBedXY
          }
        }
        // load
        browser.loadTrack(track)
        
    }
}

export const createSessionObj = (tracks: TrackBaseOptions[], reference: any): Session => {
  
  tracks = tracks.filter(track => !(track.id === "reference"))

  //TODO: locus and roi are currently set to default values
  let sessionObj: Session = {
    tracks: tracks,
    roi: [],
    locus: "all",
    reference: reference
  }

  return sessionObj
}