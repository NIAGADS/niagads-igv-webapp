import React from "react"

export default function SaveSession(props: any) {

    return(
        <div>
            <button onClick={props.handleSave}>Save Sesssion</button>
        </div>
    )
}