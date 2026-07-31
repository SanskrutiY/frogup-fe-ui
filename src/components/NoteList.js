import { useEffect, useState } from 'react';
// import * as repository from '../repository/index';
import NoteCard from './NoteCard';
import { Stack, Typography } from '@mui/material';

// list of all the note cards on the left
export default function NoteList({onNoteClick}) {

    // const [allNotes, setAllNotes] = useState([]);
    // const [error, setError] = useState("");

    const dummyDataArr = [{
        "noteId": 1,
        "noteTitle": "Morning Walk",
        "mood": "Happy",
        "noteContent": "Had a peaceful walk with tea and birdsong.",
        "imageUrl": null,
        "createdOn": "2025-11-11 13:32:02"
    }, {
        "noteId": 2,
        "noteTitle": "Lazy Sunday",
        "mood": "Sleepy",
        "noteContent": "Stayed in bed and watched movies all day.",
        "imageUrl": null,
        "createdOn": "2025-11-11 13:32:02"
    }]

    // const getAllNotes = () => {
    //     repository.getAllNotes(setAllNotes, setError);
    // };

    // useEffect(()=>{
    //     getAllNotes();
    // }, []);

    // console.log("getAllNotes -> ", allNotes)
    // console.log("error -> ",error);

    return(
        <Stack spacing={2}>
            {dummyDataArr 
            ? dummyDataArr.map((note) => (
                <NoteCard note={note} onClick={() => onNoteClick(note)}/>
            )) 
            : <Typography>Collect your mood here ;-) !</Typography>}
        </Stack>
    );
}