import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import MainShowPage from './MainShowPage';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import NoteView from './NoteView';
import SearchBar from './SearchBar';
import { Fab, Box, Paper, Typography, Tooltip, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import * as repository from '../repository/index';

export const MODES = {
    EMPTY: "empty",
    OPEN: "open",
    CREATE: "create"
}

// main alignment page
export default function Froggy(){
    const [mode, setMode] = useState(MODES.EMPTY);
    const [allNotes, setAllNotes] = useState([]);
    const [error, setError] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]); // for search notes
    const [selectedNote, setSelectedNote] = useState({});

// using forwardRef and useImperativeHandle in Froggy and NoteForm
// in order to let NoteForm own its note data
// while Froggy controls only the Save Floating action button (Fab)
// Normally, handleSave() exists inside NoteForm 
// because it needs access to the form state. 
// However, the Save button is displayed in Froggy. 
// To allow the Save button to trigger the save logic without moving the form state to Froggy, 
// we exposed the handleSave() method from NoteForm using useImperativeHandle, 
// and accessed it from Froggy through a ref created with forwardRef.
// This way, Froggy decides when to save, 
// while NoteForm decides how to save, 
// keeping responsibilities separate and avoiding unnecessary prop drilling.
    const noteFormRef = useRef();

    const AddFab = () => {
        return(
            <Tooltip title="Add Note">
                <Fab 
                color="primary"
                size="small"
                sx={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                }}
                onClick={handleCreate}>
                    <AddIcon/>
                </Fab>
            </Tooltip>
        );
    };

    const SaveFab = ({ sx = {} }) => {
        return(
            <Tooltip title="Save">
                <Fab 
                color="primary"
                size="small"
                sx={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    ...sx,      // custom sx bcccc
                }}
                onClick={() => noteFormRef.current?.handleSave()}>
                    <CheckIcon/>
                </Fab>
            </Tooltip>
        );
    };

    const CloseFab = () => {
        return(
            <Tooltip title="Close">
                <Fab 
                color="primary"
                disabled={mode === MODES.EMPTY}
                size="small"
                sx={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                }}
                onClick={()=>{return setMode(MODES.EMPTY);}}>
                    <CloseIcon/>
                </Fab>
            </Tooltip>
        );
    };

    useEffect(() => {
        repository.getAllNotes((notes) => {
            setAllNotes(notes);     // for all notes data
            // in case SearchBar passed any data we set those in here, or else by default populate it with all notes data
            setFilteredNotes(notes);    // initially show all notes
        }, setError);
    }, []);

    const handleCreate = () => {
        setMode(MODES.CREATE);
    }
    
    const handleNoteClick = (note) => {
        repository.getNoteById(
            note.noteId,
            (response) => {
                setSelectedNote(note);
                setMode(MODES.OPEN)
            },
            setError
        );
    }

    return(
    <Box 
        sx={{
        display: "flex",    
        height: "100vh",
        p: 2,
        boxSizing: "border-box",
        overflow: "hidden",
        gap: 2,
    }}
    >
        {/* Left Panel */}
        <Paper sx={{ 
            width: 320, 
            p: 2, 
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
        }}>
            <Header/>
            <Divider sx={{ borderStyle: 'none', p: 1 }} />
            <SearchBar setFilteredNotes={setFilteredNotes} allNotes={allNotes}/>  {/* allNotes pathavle , setFilteredNotes bhetle */}
            <Divider sx={{ borderStyle: 'none', p: 1 }} />
            {/* filteredNotes by default has all notes / else searched notes  */}
            <NoteList notes={filteredNotes} onNoteClick={handleNoteClick}/> 
        </Paper>

        {/* Middle Panel */}
        <Paper 
            sx={{
                flex: 1,
                p: 2,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {mode === MODES.EMPTY && <MainShowPage/>}
            {mode === MODES.OPEN && <NoteView note={selectedNote} ref={noteFormRef}/>}
            {mode === MODES.CREATE && <NoteForm ref={noteFormRef}/>}

            <CloseFab/>

            {mode === MODES.EMPTY &&
                <AddFab/>
            }
            {mode === MODES.CREATE &&
                <SaveFab/>
            }
            {mode === MODES.OPEN && (
                <>
                    <SaveFab sx={{ bottom: 80 }}/>
                    <AddFab/>
                </>
            )
            }

        </Paper>

        {/* Right Panel */}
        <Paper sx={{ width: 250, p: 2 }}>
            <Typography>Will upgrade later</Typography>
        </Paper>
    </Box>
    );  
};