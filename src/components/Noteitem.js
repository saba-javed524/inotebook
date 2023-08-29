import React, { useContext } from 'react'
import NoteContext from '../context/Notes/noteContext'

const Noteitem = (props) => {
    const noteContext = useContext(NoteContext);
    const { deleteNote } = noteContext;

    const { note, updateNote } = props;
    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">  <h5 className="card-title">{note.title}</h5> </div>
                        <div className="p-2">
                            <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully!", "success") }} ></i>
                            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text" style={{ "color": "blue" }}>{`#${note.tag}`} </p>

                </div>
            </div>
        </div >
    )
}

export default Noteitem