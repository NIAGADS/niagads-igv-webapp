import React from 'react'
import { ReactWidget } from '@jupyterlab/apputils'
import { MemoIGVBrowser as GenomeBrowser} from "@components/IGVBrowser"
import { FEATURE_SEARCH_ENDPOINT } from "@data/_constants"
import { config } from "../../public/examples/_tracks"

export class BrowserWidget extends ReactWidget {
    /**
     * Constructs a new CounterWidget.
     */
    constructor() {
      super();
      this.addClass('jp-ReactWidget');
    }
  
    render(): JSX.Element {
      return  <GenomeBrowser tracks={config} featureSearchUrl={FEATURE_SEARCH_ENDPOINT} genome="hg38"></GenomeBrowser>
    }
  }