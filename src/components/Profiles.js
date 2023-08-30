import React, { useEffect, useContext } from 'react'
import Profileitem from './Profileitem'
import AuthContext from '../context/Auth/authContext';
import NoteContext from '../context/Notes/noteContext';

const Profiles = () => {
    const authContext = useContext(AuthContext);
    const noteContext = useContext(NoteContext);
    const { profile, fetchProfile } = authContext;
    const { numberOfNotes, getNumberOfNotes } = noteContext;


    useEffect(() => {
        fetchProfile();
        getNumberOfNotes();
        // eslint-disable-next-line
    }, [])

    return (
        <Profileitem key={profile._id} profile={profile} numberOfNotes={numberOfNotes} />
    )
}

export default Profiles