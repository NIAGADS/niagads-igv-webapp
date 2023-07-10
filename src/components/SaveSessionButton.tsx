import React from "react"

export default function SaveSessionButton(props: any) {

    return(
        <div>
            <button onClick={props.handleSave}>Save Sesssion</button>
        </div>
    )
}