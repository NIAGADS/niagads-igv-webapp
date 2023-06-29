import { TrackBaseOptions } from "@browser-types/tracks";
import { decodeBedXY } from "@decoders/bedDecoder";
import { resolveTrackReader } from "./tracks";

// functions for maninpulating IGV browser object

export const loadTrack = async (config: any, browser: any) => {
    await browser.loadTrack(config);
};

export const loadServiceTracks = (tracks: TrackBaseOptions[], browser: any) => {
    for (let track of tracks) {
        //take toJSON function 
        //maybe change type to allow reader
        if (track.type.includes("_service")) {
          track.reader = resolveTrackReader(track.type, {
            endpoint: track.url,
            track: track.id,
          });
        }

        if(track.format.match("^bed\\d{1,2}\\+\\d+$") != null){ // does it match bedX+Y?
          track.decode = decodeBedXY
        }
        // load
        browser.loadTrack(track)
        
    }
}


// const loadSession = async (options) => {

//   let session
//   if (options.url || options.file) {
//       session = await loadSessionFile(options)
//   } else {
//       session = options
//   }
//   return this.loadSessionObject(session)


//   async function loadSessionFile(options) {

//       const urlOrFile = options.url || options.file

//       if (options.url && (options.url.startsWith("blob:") || options.url.startsWith("data:"))) {
//           const json = Browser.uncompressSession(options.url)
//           return JSON.parse(json)

//       } else {
//           let filename = options.filename
//           if (!filename) {
//               filename = (options.url ? await getFilename(options.url) : options.file.name)
//           }

//           if (filename.endsWith(".xml")) {

//               const knownGenomes = GenomeUtils.KNOWN_GENOMES
//               const string = await igvxhr.loadString(urlOrFile)
//               return new XMLSession(string, knownGenomes)

//           } else if (filename.endsWith(".json")) {
//               return igvxhr.loadJson(urlOrFile)
//           } else {
//               return undefined
//           }
//       }
//   }
// }

// const loadSessionObject = async (session) => {

//   // prepare to load a new session, discarding DOM and state
//   this.cleanHouseForSession()

//   this.showSampleNames = session.showSampleNames || false
//   this.sampleNameControl.setState(this.showSampleNames === true)

//   if (session.sampleNameViewportWidth) {
//       this.sampleNameViewportWidth = session.sampleNameViewportWidth
//   }

//   // axis column
//   createColumn(this.columnContainer, 'igv-axis-column')

//   // SampleName column
//   createColumn(this.columnContainer, 'igv-sample-name-column')

//   // Track scrollbar column
//   createColumn(this.columnContainer, 'igv-scrollbar-column')

//   // Track drag/reorder column
//   createColumn(this.columnContainer, 'igv-track-drag-column')

//   // Track gear column
//   createColumn(this.columnContainer, 'igv-gear-menu-column')

//   const genomeOrReference = session.reference || session.genome
//   if(!genomeOrReference) {
//       console.warn("No genome or reference object specified")
//       return;
//   }
//   const genomeConfig = await GenomeUtils.expandReference(this.alert, genomeOrReference)


//   await this.loadReference(genomeConfig, session.locus)

//   this.centerLineList = this.createCenterLineList(this.columnContainer)

//   // Create ideogram and ruler track.  Really this belongs in browser initialization, but creation is
//   // deferred because ideogram and ruler are treated as "tracks", and tracks require a reference frame
//   let ideogramHeight = 0
//   if (false !== session.showIdeogram) {

//       const track = new IdeogramTrack(this)
//       track.id = 'ideogram'

//       const trackView = new TrackView(this, this.columnContainer, track)
//       const {$viewport} = trackView.viewports[0]
//       ideogramHeight = getElementAbsoluteHeight($viewport.get(0))

//       this.trackViews.push(trackView)
//   }

//   if (false !== session.showRuler) {
//       this.trackViews.push(new TrackView(this, this.columnContainer, new RulerTrack(this)))
//   }

//   // Restore gtex selections.
//   if (session.gtexSelections) {
//       for (let referenceFrame of this.referenceFrameList) {
//           for (let s of Object.keys(session.gtexSelections)) {
//               const gene = session.gtexSelections[s].gene
//               const snp = session.gtexSelections[s].snp
//               referenceFrame.selection = new GtexSelection(gene, snp)
//           }
//       }
//   }

//   if (this.roiManager) {
//       this.roiManager.dispose()
//   }

//   const roiMenu = new ROIMenu(this, this.columnContainer)
//   if (session.roi) {

//       const roiSetList = session.roi.map(c => new ROISet(c, this.genome))
//       const named = roiSetList.filter(({name}) => name !== undefined && name.length > 0)
//       const roiTable = new ROITable(this, this.columnContainer, (named.length > 0))

//       this.roiManager = new ROIManager(this, roiMenu, roiTable, ideogramHeight, roiSetList)
//   } else {

//       const roiTable = new ROITable(this, this.columnContainer, false)
//       this.roiManager = new ROIManager(this, roiMenu, roiTable, ideogramHeight, undefined)
//   }

//   await this.roiManager.initialize()

//   // Tracks.  Start with genome tracks, if any, then append session tracks
//   const genomeTracks = genomeConfig.tracks || []
//   const trackConfigurations = session.tracks ? genomeTracks.concat(session.tracks) : genomeTracks

//   // Insure that we always have a sequence track with no explicit URL (=> the reference genome sequence track)
//   const pushSequenceTrack = trackConfigurations.filter(track => 'sequence' === track.type && !track.url && !track.fastaURL).length === 0
//   if (pushSequenceTrack /*&& false !== this.config.showSequence*/) {
//       trackConfigurations.push({type: "sequence", order: defaultSequenceTrackOrder})
//   }

//   // Maintain track order unless explicitly set
//   let trackOrder = 1
//   for (let t of trackConfigurations) {
//       if (undefined === t.order) {
//           t.order = trackOrder++
//       }
//   }

//   await this.loadTrackList(trackConfigurations)

//   // The ruler and ideogram tracks are not explicitly loaded, but needs updated nonetheless.
//   for (let rtv of this.trackViews.filter((tv) => tv.track.type === 'ruler' || tv.track.type === 'ideogram')) {
//       rtv.updateViews()
//   }


// }