import React, { useContext } from 'react'
import NoteContext from '../context/Notes/noteContext'

const Home = () => {
    const noteContext = useContext(NoteContext);
    return (
        <div>
            <div className='container my-3'>
                <h3 className='text-center'>Add a Note:</h3>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="forNoteTitle" className="form-label">Note Title:</label>
                        <input type="text" className="form-control" id="noteTitle" aria-describedby="forNoteTitle" />
                        <div id="noteTitle" className="form-text">Please enter your note title here.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="forNoteDesc" className="form-label">Note Description:</label>
                        <textarea className="form-control" id="noteDescription" rows="3" aria-describedby="forNoteDesc"></textarea>
                        <div id="noteDescription" className="form-text">Please enter your note description here.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="forNoteTags" className="form-label">Note Tags:</label>
                        <input type="text" className="form-control" id="noteTags" aria-describedby="forNoteTags" />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Note Description</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div> */}
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Add Note</button>
                </form>
                <div className='container my-3 text-center'><h3>All my Notes:</h3></div>
            </div>
        </div>
    )
}

export default Home