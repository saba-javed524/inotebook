import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initalNotes = []
    const [notes, setNotes] = useState(initalNotes);
    let [numberOfNotes, setNumberOfNotes] = useState(notes.length);

    //Fetch Data
    const fetchAllNotes = async () => {
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        setNotes(json);

    }

    const getNumberOfNotes = async () => {
        fetchAllNotes();
        setNumberOfNotes(notes.length);
    }

    const addNote = async (title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const newNote = await response.json();
        // const note = {
        //     "_id": "64e09bf1b23d26d08c591417",
        //     "user": "64e082e30d44f35c67bd9eaa",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "createdAt": "2023-08-19T10:39:45.455Z",
        //     "__v": 0
        // }
        setNotes(notes.concat(newNote));

    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        //Logic
        let newNotes = JSON.parse(JSON.stringify(notes)); //will make a copy into newNotes
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    //Delete Note
    const deleteNote = async (id) => {
        //API CALL
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        //Logic
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchAllNotes, numberOfNotes, getNumberOfNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;