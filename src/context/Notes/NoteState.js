import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notes = [
        {
            "_id": "64e09bf1b23d26d08c591417",
            "user": "64e082e30d44f35c67bd9eaa",
            "title": "Wake up Saba - 1",
            "description": "Wake up at Fajr",
            "tag": "Important saba note!",
            "createdAt": "2023-08-19T10:39:45.455Z",
            "__v": 0
        },
        {
            "_id": "64e09bf1b23d26d08c591417",
            "user": "64e082e30d44f35c67bd9eaa",
            "title": "Wake up Saba - 1",
            "description": "Wake up at Fajr",
            "tag": "Important saba note!",
            "createdAt": "2023-08-19T10:39:45.455Z",
            "__v": 0
        }
    ]
    return (
        <NoteContext.Provider>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;