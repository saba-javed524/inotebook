import { useContext, useState } from 'react'
import NoteContext from '../context/Notes/noteContext'


const AddNote = (props) => {
    const noteContext = useContext(NoteContext);
    const { addNote } = noteContext;

    const [note, setNote] = useState({ "title": "", "description": "", "tag": "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAddNoteClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag === '' ? 'general' : note.tag);
        setNote({ "title": "", "description": "", "tag": "" });
        props.showAlert("Note added successfully!", "success");
    }
    return (
        <div>
            <div className='container my-3 '>
                <h3 className='text-center' style={{ padding: "30px" }}>Add a Note:</h3>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Note Title:</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="forNoteTitle" onChange={onChange} />
                        <div id="noteTitle" className="form-text">Please enter your note title here (atleast 5 characters).</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Note Description:</label>
                        <textarea className="form-control" id="description" name="description" value={note.description} rows="3" aria-describedby="description" onChange={onChange} minLength={5} required></textarea>
                        <div id="noteDescription" className="form-text">Please enter your note description here (atleast 5 characters).</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Note tag:</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} aria-describedby="tag" onChange={onChange} minLength={5} required />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAddNoteClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote