import React, { useLayoutEffect, useMemo, useState, useEffect } from "react";
import igv from "igv/dist/igv.esm";
import noop from "lodash.noop";
import find from "lodash.find";
import {
  GWASServiceTrack as GWASTrack,
  VariantServiceTrack as VariantTrack,
  trackPopover
} from "@tracks/index";
import { _genomes } from "@data/_igvGenomes";
import { Session, TrackBaseOptions } from "@browser-types/tracks";
import { resolveTrackReader, loadTrack, loadConfigTracks, createSessionObj, downloadObjectAsJson, removeNonReferenceTracks} from "@utils/index";
import { decodeBedXY } from "@decoders/bedDecoder";
import LoadSession from "./LoadSession";
import SaveSession from "./SaveSession";


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
  const [sessionJSON, setSessionJSON] = useState<Session>(null);

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
    if (browserIsLoaded && memoOptions) {
    // function that takes tracks and the` browser 
      loadConfigTracks(tracks, browser)
    }
  }, [browserIsLoaded, memoOptions, tracks]);

  useLayoutEffect(() => {
    window.addEventListener("ERROR: Genome Browser - ", (event) => {
      console.log(event);
    });

    const targetDiv = document.getElementById("genome-browser");
    if (memoOptions != null) {
      igv.createBrowser(targetDiv, memoOptions).then(function (browser: any) {
        // browser is initialized and can now be used

        // custom track popovers
        browser.on("trackclick", trackPopover);

        // perform action in encapsulating component if track is removed
        browser.on("trackremoved", function (track: any) {
          onTrackRemoved && onTrackRemoved(track.config.id);
        });

        // add custom track types to track factory
        browser.addTrackToFactory(
          "gwas_service",
          (config: any, browser: any) => new GWASTrack(config, browser)
        );

        browser.addTrackToFactory(
          "variant_service",
          (config: any, browser: any) => new VariantTrack(config, browser)
        );

        // add browser to state
        setBrowser(browser);
        setBrowserIsLoaded(true);

        // callback to parent component, if exist
        onBrowserLoad ? onBrowserLoad(browser) : noop();
      });
    }
  }, [onBrowserLoad, memoOptions]);

  useEffect(() => {
    if(sessionJSON){
      //remove all the non-reference tracks
      removeNonReferenceTracks(tracks, browser)
      //filter out the sequence track
      sessionJSON.tracks = sessionJSON.tracks.filter(track => !(track.type === "sequence"))
      //load the tracks
      loadConfigTracks(sessionJSON.tracks, browser)
    }
  }, [sessionJSON])

  const handleSave = () => {
    if(browserIsLoaded){
      let sessionObj = createSessionObj(tracks)
      downloadObjectAsJson(sessionObj, "NIAGADS_IGV_session")
    }
    else{
      alert("Wait until the browser is loade before saving")
    }
  }

  return (
    <div>
      <LoadSession setSessionJSON={setSessionJSON}/>
      <SaveSession handleSave={handleSave}/>
      <span style={{ width: "100%" }} id="genome-browser" />
    </div>
  );
};  

export const MemoIGVBrowser = React.memo(IGVBrowser);
export default IGVBrowser;
