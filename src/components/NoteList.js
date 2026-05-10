import { useEffect, useState } from 'react';
import * as repository from '../repository/index';
import NoteCard from './NoteCard';
import "./NoteList.css";

// list of all the note cards on the left
export default function NoteList() {

    const [allNotes, setAllNotes] = useState([]);
    const [error, setError] = useState("");

    const getAllNotes = () => {
        repository.getAllNotes(setAllNotes, setError);
    };

    useEffect(()=>{
        getAllNotes();
    }, []);

    console.log("getAllNotes -> ", allNotes)
    console.log("error -> ",error);

    return(
        <div className='note-list-container'>
            {allNotes.length > 0 ? (
                allNotes.map(note => (
                    <NoteCard key={note.noteId} note={note}/>
                ))
            ) : (
                <p>No available notes</p>
            )
            }
        </div>
    );
}