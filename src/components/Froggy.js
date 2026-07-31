import React, { useEffect, useState } from 'react';
import Header from './Header';
import MainShowPage from './MainShowPage';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import NoteView from './NoteView';
import SearchBar from './SearchBar';
import { Fab, Box, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const MODES = {
    EMPTY: "empty",
    VIEW: "view",
    EDIT: "edit",
    CREATE: "create"
}

// main alignment page
export default function Froggy(){
    const [mode, setMode] = useState(MODES.EMPTY);

    const handleCreate = () => {
        setMode(MODES.CREATE);
    }

    return(
    <Box sx={{ display: "flex", height: "100vh", gap: 2, p: 2 }}>
        {/* Left Panel */}
        <Paper sx={{ width: 320, p: 2 }}>
            <Header/>
            <SearchBar/>
            <NoteList/>
        </Paper>

        {/* Middle Panel */}
        <Paper sx={{ flex: 1, p: 2, position: "relative" }}>
            {mode === MODES.EMPTY && <MainShowPage/>}
            {mode === MODES.VIEW && <NoteView isEdit={false}/>}
            {mode === MODES.EDIT && <NoteView isEdit={true}/>}
            {mode === MODES.CREATE && <NoteForm/>}
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