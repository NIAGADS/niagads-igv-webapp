"use client";

// TODO: streaming w/Suspense and fallback instead

import React, {
	useLayoutEffect,
	useMemo,
	useState,
	useEffect,
	useRef,
	useCallback,
} from "react";
import igv from "igv/dist/igv.esm";
import noop from "lodash.noop";
import find from "lodash.find";
import {
	VariantPValueTrack,
	VariantServiceTrack as VariantTrack,
	trackPopover,
} from "./tracks";
import { _genomes } from "./common/_igvGenomes";
import { Session, TrackBaseOptions } from "./types/tracks";
import {
	loadTracks,
	downloadObjectAsJson,
	getLoadedTracks,
	removeTracks,
	cleanTracks,
	convertStringToTrackNames,
	selectTracksFromURLParams,
	addDefaultFlank,
	createROIFromLocusRange,
} from "./utils";

import { useSessionStorage } from "usehooks-ts";
import {
	BrowserChangeEvent,
	QueryParams,
	ReferenceFrame,
} from "./types/browser";

import { DEFAULT_FLANK } from "./common/_constants";

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
	const [browserChange, setBrowserChange] =
		useState<BrowserChangeEvent>("none");
	const [sessionJSON, setSessionJSON] = useSessionStorage<Session>(
		"sessionJSON",
		null
	);
	const isDragging = useRef<boolean>(false);

	const [isClient, setIsClient] = useState(false);
	const containerRef = useRef(null);

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
		setIsClient(true);
	}, []);
	useEffect(() => {
		// setting initial session due to component load/reload
		if (browserIsLoaded && memoOptions && tracks) {
			const queryParams = getQueryParams();

			if (Object.keys(queryParams).length !== 0) {
				if (queryParams.hasOwnProperty("tracks"))
					loadTracks(queryParams.tracks, browser);
				else loadTracks(tracks, browser);
				if (queryParams.hasOwnProperty("locus")) {
					browser.search(queryParams.locus);
					browser.loadROI(queryParams.roi);
				}
				onBrowserChange("loadfromqueryparams");
			} else if (sessionJSON != null) {
				loadTracks(sessionJSON.tracks, browser);
				if (sessionJSON.hasOwnProperty("roi"))
					browser.loadROI(sessionJSON.roi);
				if (sessionJSON.hasOwnProperty("locus"))
					browser.search(sessionJSON.locus);
			} else {
				loadTracks(tracks, browser);
				onBrowserChange("initialload");
			}
		}
	}, [browserIsLoaded]);

	useLayoutEffect(() => {
		if (isClient && containerRef.current) {
			const targetDiv = containerRef.current;
			// const targetDiv = document.getElementById("genome-browser");

			if (memoOptions != null) {
				igv.registerTrackClass("gwas_service", VariantPValueTrack);
				igv.registerTrackClass("qtl", VariantPValueTrack);
				igv.registerTrackClass("variant_service", VariantTrack);

				igv.createBrowser(targetDiv, memoOptions).then(function (
					browser: any
				) {
					// custom track popovers
					browser.on("trackclick", trackPopover);

					browser.on("trackremoved", (track: any) => {
						onTrackRemoved && onTrackRemoved(track);
						onBrowserChange("trackremoved");
					});

					browser.on(
						"locuschange",
						(referenceFrameList: ReferenceFrame[]) => {
							!isDragging.current &&
								onBrowserChange("locuschange");
						}
					);

					browser.on("trackdrag", () => {
						if (!isDragging.current) {
							isDragging.current = true;
						}
					});

					browser.on("trackdragend", () => {
						isDragging.current = false;
						onBrowserChange("locuschange");
					});

					browser.on("updateuserdefinedroi", (manager: any) => {
						onBrowserChange("updateuserdefinedroi");
					});

					// add browser to state
					setBrowser(browser);
					setBrowserIsLoaded(true);

					// callback to parent component, if exist
                    if (onBrowserLoad) {
                        onBrowserLoad(browser);
                    } else {
                        noop();
                    }
				});
			}
		}
	}, [isClient]);

	useEffect(() => {
		if (browserChange !== "none") {
			createSessionObj(browserChange).then((sessionObj) => {
				setSessionJSON(sessionObj);
			});
			setBrowserChange("none");
		}
	}, [browserChange]);

	const onBrowserChange = useCallback((changeType: BrowserChangeEvent) => {
		setBrowserChange(changeType);
	}, []);

	const handleSaveSession = async () => {
		if (browserIsLoaded) {
			let sessionObj = await createSessionObj("savesession");
			sessionObj = cleanSessionObj(sessionObj);
			downloadObjectAsJson(sessionObj, "NIAGADS_IGV_session");
		} else {
			alert("Wait until the browser is loaded before saving");
		}
	};

    // FIXME: correct the error checking, just have each case return instead of break
	const createSessionObj = async (changeType: BrowserChangeEvent) => {
		let sessionObj: Session

		switch (changeType) {
			case "initialload":
				sessionObj = {
					tracks: tracks,
					roi: [],
                    // FIXME: nothing should be hardcoded
					locus: "chr19:1,038,997-1,066,572",
				};
				break;
			case "locuschange":
				sessionObj = {
					tracks: sessionJSON.tracks,
					roi: sessionJSON.roi,
					locus: browser.currentLoci(),
				};
				break;
			case "updateuserdefinedroi":
				sessionObj = {
					tracks: sessionJSON.tracks,
					roi: [
						{
							features: await browser.getUserDefinedROIs(),
							isUserDefined: true,
						},
					],
					locus: sessionJSON.locus,
				};
				break;
			case "loadsession":
			case "loadfromqueryparams":
				sessionObj = {
					tracks: cleanTracks(getLoadedTracks(browser)),
					roi: [
						{
							features: await browser.getUserDefinedROIs(),
							isUserDefined: true,
						},
					],
					locus: browser.currentLoci(),
				};
				break;
			case "trackremoved":
				sessionObj = {
					tracks: cleanTracks(getLoadedTracks(browser)),
					roi: sessionJSON.roi,
					locus: sessionJSON.locus,
				};
				break;
			case "savesession":
				sessionObj = {
					tracks: sessionJSON.tracks,
					roi: sessionJSON.roi,
					locus: sessionJSON.locus,
				};
			default:
				console.error(
					"changeType is not an expected value, it is: ",
					changeType
				);
		}

		return sessionObj;
	};

	const handleLoadFileClick = (jsonObj: Session) => {
		removeTracks(browser);
		loadTracks(jsonObj.tracks, browser);
		if (jsonObj.hasOwnProperty("roi")) {
			browser.clearROIs();
			browser.loadROI();
		}
		if (jsonObj.hasOwnProperty("locus")) browser.search(jsonObj.locus);
		onBrowserChange("loadsession");
	};

	const getQueryParams = () => {
		let params: QueryParams = {};
		const queryParams = new URLSearchParams(window.location.search);
		if (queryParams.has("tracks"))
			params.tracks = selectTracksFromURLParams(
				tracks,
				convertStringToTrackNames(queryParams.get("tracks"))
			);
		if (queryParams.has("locus")) {
			params.locus = addDefaultFlank(queryParams.get("locus"));
			params.roi = createROIFromLocusRange(queryParams.get("locus"));
		}
		return params;
	};

	const cleanSessionObj = (obj: Session) => {
		//remove reader and metadata to prepare session for download
		obj.tracks.map((track) => {
			for (let property in track) {
				//@ts-ignore
				if (property === "reader") delete track.reader;
				else if (property === "metadata") {
					//@ts-ignore
					let description = track.metadata.Description;
					//@ts-ignore
					delete track.metadata;
					track.description = description;
				}
			}
		});

		//remove refereence object
		tracks = tracks.filter((track) => track.id !== "reference");

		return obj;
	};

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <span
                ref={containerRef}
                style={{ width: "100%" }}
                id="genome-browser"
            />
        </>
    );
};

export const MemoIGVBrowser = React.memo(IGVBrowser);
export default IGVBrowser;
