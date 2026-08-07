import React from 'react';
import NoteCard from './NoteCard';
import { Stack, Typography, Box } from '@mui/material';

// list of all the note cards on the left
export default function NoteList({notes, onNoteClick}) {

    return(
        <Box
            sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            }}
        >
        <Stack spacing={2}>
            {notes.length > 0
            ? notes.map((note) => (
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