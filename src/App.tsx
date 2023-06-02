import React, { Component} from "react";

import { IGVBrowser } from "./components/GenomeBrowser/IGV/IGVBrowser"
import { FEATURE_SEARCH_ENDPOINT } from "../data/_constants";
import { config } from "../data/_tracks";

const App = () => {
  return (
    <IGVBrowser tracks={config} featureSearchUrl={FEATURE_SEARCH_ENDPOINT} genome="hg38_refseq"></IGVBrowser>
  )
}

export default App;