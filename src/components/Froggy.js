import React, { useEffect, useState } from 'react';
import Header from './Header';
import MainShowPage from './MainShowPage';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import NoteView from './NoteView';
import SearchBar from './SearchBar';
import { Fab, Box, Paper, Typography, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export const MODES = {
    EMPTY: "empty",
    VIEW: "view",
    EDIT: "edit",
    CREATE: "create"
}

// main alignment page
export default function Froggy(){
    const [mode, setMode] = useState(MODES.EMPTY);
    const [selectedNote, setSelectedNote] = useState({});

    const handleCreate = () => {
        setMode(MODES.CREATE);
    }
    
    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setMode(MODES.VIEW)
    }

    return(
    <Box sx={{ display: "flex", height: "100vh", gap: 2, p: 2 }}>
        {/* Left Panel */}
        <Paper sx={{ width: 320, p: 2 }}>
            <Header/>
            <SearchBar/>
            <NoteList onNoteClick={handleNoteClick}/>
        </Paper>

        {/* Middle Panel */}
        <Paper sx={{ flex: 1, p: 2, position: "relative" }}>
            {mode === MODES.EMPTY && <MainShowPage/>}
            {mode === MODES.VIEW && <NoteView isEdit={false} note={selectedNote}/>}
            {mode === MODES.EDIT && <NoteView isEdit={true} note={selectedNote}/>}
            {mode === MODES.CREATE && <NoteForm/>}
            
            <Tooltip title="Close">
            <Fab 
            color="primary"
            sx={{
                position: "absolute",
                bottom: 24,
                right: 90,
            }}
            onClick={()=>{return setMode(MODES.EMPTY);}}>
                <CloseIcon/>
            </Fab>
            </Tooltip>

            <Tooltip title="Add Note">
            <Fab 
            color="primary"
            sx={{
                position: "absolute",
                bottom: 24,
                right: 24,
            }}
            onClick={handleCreate}>
                <AddIcon/>
            </Fab>
            </Tooltip>
        </Paper>

        {/* Right Panel */}
        <Paper sx={{ width: 250, p: 2 }}>
            <Typography>Will upgrade later</Typography>
        </Paper>
    </Box>
    
    //     <div className="sidebar">
    //     <div className="main-content">
    //     <div className="extra-panel">
    );  
};