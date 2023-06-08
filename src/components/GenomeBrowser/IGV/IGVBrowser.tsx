import React, { useLayoutEffect, useMemo } from "react";
import igv from "igv/dist/igv.esm";
import merge from "lodash.merge";
import noop from "lodash.noop";
import find from "lodash.find";
import {
  GWASServiceTrack as GWASTrack,
  VariantServiceTrack as VariantTrack,
} from "./Tracks";
import { _genomes } from "../../../../data/_igvGenomes";
import { TrackBaseOptions } from "niagads-igv-webapp/src/types/Tracks";
import { resolveTrackReader } from "../../../utils/tracks";

export const DEFAULT_FLANK = 1000;

interface IGVBrowserProps {
  featureSearchUrl: string;
  genome: string;
  locus?: string;
  onTrackRemoved?: (track: string) => void;
  onBrowserLoad?: (Browser: any) => void;
  tracks: TrackBaseOptions[];
}

export const IGVBrowser: React.FC<IGVBrowserProps> = ({
  featureSearchUrl,
  genome,
  locus,
  onBrowserLoad,
  onTrackRemoved,
  tracks
}) => {

  const options = useMemo(() => {
    const referenceTrackConfig: any = find(_genomes, { id: genome });
    let memoOptions = {
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
    }

    for(let track of tracks){
      track.reader = resolveTrackReader(track.type, {endpoint: track.url, track: track.id})
    }

    if (!memoOptions.hasOwnProperty("tracks")) {
      memoOptions = merge(memoOptions, { tracks: [] });
    }
    return memoOptions;
  }, [genome]);
  
  useLayoutEffect(() => {
    window.addEventListener("ERROR: Genome Browser - ", (event) => {
      console.log(event);
    });
    if(options != null){
      const targetDiv = document.getElementById("genome-browser");
      igv.createBrowser(targetDiv, options).then(function (browser: any) {
        // browser is initialized and can now be used
    
        // browser.on("trackclick", _customTrackPopup);

        // perform action in encapsulating component if track is removed
        browser.on("trackremoved", function (track: any) {
          onTrackRemoved && onTrackRemoved(track.config.id);
        });

        browser.addTrackToFactory(
          "gwas_service",
          (config: any, browser: any) => new GWASTrack(config, browser)
        );

        browser.addTrackToFactory(
          "variant_service",
          (config: any, browser: any) => new VariantTrack(config, browser)
        );

        onBrowserLoad ? onBrowserLoad(browser) : noop();
      });
    }
  }, [onBrowserLoad, options]);

  return <span style={{ width: "100%" }} id="genome-browser" />;
};


export const MemoIGVBroswer = React.memo(IGVBrowser);