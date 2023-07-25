import React, { useLayoutEffect, useMemo, useState, useEffect, useRef } from "react";
import igv from "igv/dist/igv.esm";
import noop from "lodash.noop";
import find from "lodash.find";
import isEqual from "lodash.isequal";
import {
  VariantPValueTrack,
  VariantServiceTrack as VariantTrack,
  trackPopover,
} from "@tracks/index";
import { _genomes } from "@data/_igvGenomes";
import { ROISet, Session, TrackBaseOptions } from "@browser-types/tracks";
import {
  loadTracks,
  createSessionObj,
  downloadObjectAsJson,
  getLoadedTracks,
  removeTrackById,
  removeAndLoadTracks,
  createLocusString,
  removeTrackFromList
} from "@utils/index";
import { decodeBedXY } from "@decoders/bedDecoder";
import LoadSession from "./LoadSession";
import SaveSession from "./SaveSession";
import { useSessionStorage } from "usehooks-ts";
import AddTracksButton from "./AddTracksButton";
import { ReferenceFrame } from "@browser-types/browserObjects";

export const DEFAULT_FLANK = 1000;

interface IGVBrowserProps {
  featureSearchUrl: string;
  genome: string;
  locus?: string;
  onTrackRemoved?: (track: string) => void;
  onBrowserLoad?: (Browser: any) => void;
  tracks: TrackBaseOptions[];
}

const IGVBrowser: React.FC<IGVBrowserProps> = ({
  featureSearchUrl,
  genome,
  locus,
  onBrowserLoad,
  onTrackRemoved,
  tracks,
}) => {
  const [browserIsLoaded, setBrowserIsLoaded] = useState<boolean>(false);
  const [browser, setBrowser] = useState<any>(null);
  const [sessionJSON, setSessionJSON] = useSessionStorage<Session>('sessionJSON', null)
  const isDragging = useRef<boolean>(false)
  
  const memoOptions: any = useMemo(() => {
    const referenceTrackConfig: any = find(_genomes, { id: genome });
    return {
      locus: locus || "ABCA7",
      showAllChromosomes: false,
      flanking: DEFAULT_FLANK,
      minimumBases: 40,
      search: {
        url: `${featureSearchUrl}$FEATURE$&flank=${DEFAULT_FLANK}`,
      },
      reference: {
        id: genome,
        name: referenceTrackConfig.name,
        fastaURL: referenceTrackConfig.fastaURL,
        indexURL: referenceTrackConfig.indexURL,
        cytobandURL: referenceTrackConfig.cytobandURL,
        tracks: referenceTrackConfig.tracks,
      },
      loadDefaultGenomes: false,
      genomeList: _genomes,
    };
  }, [genome, locus]);

  useEffect(() => {
    // setting initial session due to component load/reload
    if (browserIsLoaded && memoOptions && tracks) {
      if(sessionJSON != null) {
        removeAndLoadTracks(sessionJSON.tracks, browser);
        if(sessionJSON.hasOwnProperty("roi")) removeAndLoadROIs(sessionJSON.roi, browser);
        if(sessionJSON.hasOwnProperty("locus")) browser.search(sessionJSON.locus)
      }
      else {
        removeAndLoadTracks(tracks, browser);
        onBrowserChange("initialLoad", null)
      }
    }
  }, [browserIsLoaded, memoOptions, tracks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //check to see if current ROIs are different than the past ROIs
      // && browser.roiManager.roiSets.length !== 0 &&!isEqual(prevROI, JSON.parse(JSON.stringify(browser.roiManager.roiSets)))
      if(browser && browser.roiManager.roiSets.length !== 0){
        const currentROIs = browser.getUserDefinedROIs()
        if(!isEqual(currentROIs, JSON.parse(JSON.stringify(browser.roiManager.roiSets)))){
          const ROISets = JSON.parse(JSON.stringify(browser.roiManager.roiSets))
          let updatedSession: Session = null
          if(sessionJSON) updatedSession = sessionJSON
          //if there's no session then create one with default tracks and locus
          else updatedSession = createSessionObj(tracks)
          updatedSession.roi = ROISets
          setSessionJSON(updatedSession)
        }
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [browserIsLoaded, browser]);

  const removeAndLoadROIs = (ROIs: ROISet[], browser: any) => {
    console.log("ROIs: ", ROIs)
    browser.clearROIs()
    browser.loadROI(ROIs)
  }
  useLayoutEffect(() => {
    window.addEventListener("ERROR: Genome Browser - ", (event) => {
      console.log(event);
    });

    const targetDiv = document.getElementById("genome-browser");

    if (memoOptions != null) {
      igv.registerTrackClass("gwas_service", VariantPValueTrack);
      igv.registerTrackClass("eqtl", VariantPValueTrack);
      igv.registerTrackClass("variant_service", VariantTrack);

      igv.createBrowser(targetDiv, memoOptions).then(function (browser: any) {
        // custom track popovers
        browser.on("trackclick", trackPopover);

        // perform action in encapsulating component if track is removed
        //callback does not get the updated value of sessionJSON so functional form of the setter is used
        browser.on("trackremoved", (track: any) => {
          onTrackRemoved && onTrackRemoved(track)
          onBrowserChange("trackRemoved", track)
        });

        browser.on("locuschange", (referenceFrameList: ReferenceFrame[]) => {
          !isDragging.current && sessionJSON && 
          onBrowserChange("locus", createLocusString(referenceFrameList))
        })

        browser.on("trackdrag", () => {
          if(!isDragging.current){
            isDragging.current = true
          } 
        })

        browser.on("trackdragend", () => {
          isDragging.current = false
          const currentLoci: string = browser.currentLoci()
          onBrowserChange("locus", currentLoci)
        })

        browser.on("updateuserdefinedroi", function (manager: any) {
          console.log(manager)
          alert("roi updated")
        })

        // add browser to state
        setBrowser(browser);
        setBrowserIsLoaded(true);

        // callback to parent component, if exist
        onBrowserLoad ? onBrowserLoad(browser) : noop();
      });
    }
  }, [onBrowserLoad, memoOptions]);

  const onBrowserChange = (change: string, update: any) => {
    switch(change){
      case "locus":
        //update the locus in the session
        setSessionJSON((previousSession) => {
          previousSession.locus = update
          return previousSession
        })
        break
      case "trackRemoved":
        setSessionJSON((previousSession) => {
          previousSession.tracks = removeTrackFromList(previousSession.tracks, update)
          return previousSession
        })
        break
      case "addTracks":
        sessionJSON.tracks = sessionJSON.tracks.concat(update)
        setSessionJSON(sessionJSON)
        break
      case "loadSession":
        setSessionJSON(createSessionObj(update.tracks))
        break
      case "initialLoad":
        //should this also be the default
        setSessionJSON(createSessionObj(tracks))
        break
      default:
        console.error("change param provided to onBrowserChange does not exist")
    }
  }

  //rearrange
  const handleSaveSession = () => {
    if (browserIsLoaded) {
      let sessionObj = createSessionObj(sessionJSON.tracks);
      downloadObjectAsJson(sessionObj, "NIAGADS_IGV_session");
    } else {
      alert("Wait until the browser is loaded before saving");
    }
  };

  //TODO: update to handle ROIs and locus
  const handleLoadFileClick = (jsonObj: Session) => {
    removeAndLoadTracks(jsonObj.tracks, browser);
    onBrowserChange("loadSession", jsonObj)
  }

  return (
    <>
      <LoadSession handleLoadFileClick={handleLoadFileClick} />
      <SaveSession handleSave={handleSaveSession} />
      <AddTracksButton browser={browser} onBrowserChange={onBrowserChange}/>
      <span style={{ width: "100%" }} id="genome-browser" />
    </>
  );
};

export const MemoIGVBrowser = React.memo(IGVBrowser);
export default IGVBrowser;
