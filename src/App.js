import React, { Component} from "react";

import { IGVBrowser } from "./components/GenomeBrowser";
import { SERVICE_URL } from "../data/constants";


class App extends Component{
  render(){
    return(
      <div className="App">
      <IGVBrowser serviceUrl={SERVICE_URL}></IGVBrowser>
      </div>
    );
  }
}

export default App;