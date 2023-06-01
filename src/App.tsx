import React, { Component} from "react";

import { IGVBrowser } from "./components/GenomeBrowser/IGV/IGVBrowser"
import { SERVICE_URL } from "../data/_constants";
import { config } from "../data/_tracks.js";

const App = () => {
  return (
    <IGVBrowser featureSearchUrl={SERVICE_URL} genome="hg38_refseq"></IGVBrowser>
  )
}

export default App;