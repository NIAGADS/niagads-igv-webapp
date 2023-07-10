import { loadTracks } from "@utils/browser";
import React, { useState, useEffect } from "react";
import { useRef } from "react"

export default function AddTrackButton(props: any) {
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
                const jsonObj = JSON.parse(event.target.result);
                loadTracks(jsonObj, props.browser)
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
            <button onClick={handleClick}>Add New Track</button>
        </div>
    )
}