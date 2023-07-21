import { loadTracks } from "@utils/browser";
import React, { useState, useEffect } from "react";
import { useRef } from "react"

export default function AddTracksButton(props: any) {
    const fileRef = useRef(null)

    const handleClick = () => {
        fileRef.current.click();
    }

    const handleFileChange = (e: any) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) return;
        const reader = new FileReader();
        reader.onload = (event: any) => {
            try{
                let newTracks = null;
                const jsonObj = JSON.parse(event.target.result);
                //for differentiating between when a user uploads just an array of tracks
                // vs. a session that is an object with a prpoerty "tracks"
                if(jsonObj.hasOwnProperty("tracks")) newTracks = jsonObj.tracks
                else newTracks = jsonObj
                loadTracks(newTracks, props.browser)
                props.onBrowserChange("addTracks", newTracks)
            }
            catch(error) {
                console.error(error)
            }
        }

        reader.readAsText(fileObj)

        e.target.value = null;
    }

    return(
        <div>
            <input 
                type="file" 
                ref={fileRef} 
                accept=".json" 
                style={{display: 'none'}}
                onChange={handleFileChange}
            ></input>
            <button onClick={handleClick}>Add New Tracks</button>
        </div>
    )
}