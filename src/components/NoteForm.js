import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Divider, Grid, Paper, TextField, Tooltip } from '@mui/material';
import { styled } from "@mui/material/styles";
import { MOOD } from '../constants/Mood';
import * as repository from '../repository/index';
import { useSnackbar } from 'notistack';

const PREFIX = "NoteForm";
const classes = {
    title: `${PREFIX}-title`,
    content: `${PREFIX}-content`,
    moodGrid: `${PREFIX}-moodGrid`
};
const StyledPaper = styled(Paper)(() => ({
    [`& .${classes.title} .MuiFilledInput-root`]: {
        backgroundColor: "transparent",
    },
    [`& .${classes.title} .MuiFilledInput-root::before`]: {
        borderBottom: "1px solid transparent",
    },
    [`& .${classes.title} .MuiFilledInput-root:hover::before`]: {
        borderBottom: "1px solid #d3d3d3",
    },
    [`& .${classes.title} .MuiFilledInput-root.Mui-focused::after`]: {
        borderBottom: "1px solid #d3d3d3",
    },


    [`& .${classes.content} .MuiOutlinedInput-notchedOutline`]: {
        border: "none",
    },
    [`& .${classes.content}:hover .MuiOutlinedInput-notchedOutline,
        & .${classes.content} .Mui-focused .MuiOutlinedInput-notchedOutline`]: {
        border: "none",
    },

    [`& .${classes.moodGrid}`]: {
        width: 64,
        height: 64,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "0.2s",
        border: "2px solid transparent",

        "&:hover": {
            transform: "scale(1.08)",
            backgroundColor: "#F5F5F5",
        },
    },
}));

// new or edit note page look (create/edit note)
const NoteForm = forwardRef(({ note = null }, ref) => {
    // note = null in JS -> is a default value
    // if no note is passed then note = null

    const [title, setTitle] = useState(note?.noteTitle ?? "");
    const [content, setContent] = useState(note?.noteContent ?? "");
    const [selectedMood, setSelectedMood] = useState(
        MOOD.find((m) => m.displayName === note?.mood) ?? null
    );
    const [data, setData] = useState(null);
    const [error, setError] =   useState("");
    const { enqueueSnackbar } = useSnackbar();

    // changing data when the note has new values
    // had to add because when we didn't have this,
    // whenever note1 was clicked it'd show it's data
    // but if note2 was clicked, note object gets populated
    // but the states title, content, mood doesn't refreshes (i.e. no rendering)
    // so we just render it
    useEffect(() => {
        setTitle(note?.noteTitle ?? "");
        setContent(note?.noteContent ?? "");
        // on opening the note -> it's mood should stay selected
        setSelectedMood(
            MOOD.find((m) => m.displayName === note?.mood) ?? null
        );
    }, [note]);

    const handleSave = () => {
        const reqData = {
            noteTitle: title.trim() || "Untitled",
            noteContent: content,
            mood: selectedMood?.displayName
        };

        if(note){
            // update api
            repository.updateNote(
                note.noteId,
                reqData,
                (response) => {
                    setData(response);
                    enqueueSnackbar("Note updated successfully!", {
                        variant: 'success'
                    });
                },
                (error) => {
                    setError(error);
                    enqueueSnackbar("Something went wrong!", {
                        variant: 'error'
                    });
                }
            );
        } else {
            // create api
            repository.createNote(
                reqData,
                (response) => {
                    setData(response);
                    enqueueSnackbar("Note created successfully!", {
                        variant: 'success'
                    });
                },
                (error) => {
                    setError(error);
                    enqueueSnackbar("Something went wrong!", {
                        variant: 'error'
                    });
                }
            );
        }
    };
    useImperativeHandle(ref, () => ({
        handleSave,
    }));
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

    return(
        <StyledPaper sx={{
            p: 4,
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}>
            {/* Title */}
            <TextField 
                value={title}
                onChange={(e) => setTitle(e.target.value)}  // to update the values
                className={classes.title}
                variant='filled' 
                placeholder='Untitled' 
                fullWidth
            />

            {/* Content */}
            <TextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={classes.content}
                variant='outlined' 
                placeholder='Start writing ...' 
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
            />
            <Divider/>

            {/* Mood Selector */}
            <Grid container spacing={2}>
                {/* Frog buttons here */}
                {MOOD.map((mood) => (
                    <Grid size={2} key={mood.id}>
                        <Tooltip title={mood.displayName}>
                            <Paper 
                                className={classes.moodGrid}
                                sx={{
                                    border: selectedMood?.id === mood.id
                                        ? "2px solid #66BB6A"
                                        : undefined,
                                }}
                                onClick={() => setSelectedMood(mood)}
                                elevation={selectedMood?.id === mood.id ? 4 : 0}
                            >
                                <img
                                    src={mood.image}
                                    alt={mood.displayName}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover", // or "contain"
                                        borderRadius: 8,
                                        filter:
                                            selectedMood?.id === mood.id
                                                ? "none"
                                                : "grayscale(100%) opacity(0.5)",
                                        transition: "filter 0.2s ease",
                                    }}
                                />
                            </Paper>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
        </StyledPaper>
    );
});

export default NoteForm;