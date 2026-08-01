import React, { useState } from 'react';
import { Box, TextField, Tooltip, Popover, Typography } from '@mui/material';
import NoteForm from './NoteForm';

// how it looks when you view the note on click (detailed view)
export default function NoteView({note}){
    return(
        <>
        <NoteForm note={note}/>
        {/* this page would have edit button */}
        </>
    );
}