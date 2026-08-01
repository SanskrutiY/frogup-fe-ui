import { useEffect, useState } from 'react';
import * as repository from '../repository/index';
import NoteCard from './NoteCard';
import { Stack, Typography, Box } from '@mui/material';

// list of all the note cards on the left
export default function NoteList({onNoteClick}) {

    const [allNotes, setAllNotes] = useState([]);
    const [error, setError] = useState("");

    const getAllNotes = () => {
        repository.getAllNotes(setAllNotes, setError);
    };

    useEffect(()=>{
        getAllNotes();
    }, []);

    return(
        <Box
            sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            }}
        >
        <Stack spacing={2}>
            {allNotes.length > 0
            ? allNotes.map((note) => (
                <NoteCard 
                    key={note.noteId}
                    note={note} 
                    onClick={() => onNoteClick(note)}
                />
            )) 
            : <Typography>Collect your mood here ;-) !</Typography>}
        </Stack>
        </Box>
    );
}