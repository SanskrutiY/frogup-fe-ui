import React, { useEffect, useState } from 'react';
import { Divider, Grid, Paper, TextField, Tooltip, Fab } from '@mui/material';
import { styled } from "@mui/material/styles";
import { MOOD } from '../constants/Mood';
import CheckIcon from '@mui/icons-material/Check';

// new or edit note page look (create/edit note)
export default function NoteForm({note = null}) {
    // note = null in JS -> is a default value
    // if no note is passed then note = null
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

    const [title, setTitle] = useState(note?.noteTitle ?? "");
    const [content, setContent] = useState(note?.noteContent ?? "");
    const [selectedMood, setSelectedMood] = useState(note?.mood ?? null);

    // changing data when the note has new values
    // had to add because when we didn't have this,
    // whenever note1 was clicked it'd show it's data
    // but if note2 was clicked, note object gets populated
    // but the states title, content, mood doesn't refreshes (i.e. no rendering)
    // so we just render it
    useEffect(() => {
        setTitle(note?.noteTitle ?? "");
        setContent(note?.noteContent ?? "");
        setSelectedMood(note?.mood ?? null);
    }, [note]);

    const handleSave = () => {
        const data = {
            noteTitle: title,
            noteContent: content,
            mood: selectedMood
        };

        if(note){
            // update api
        } else {
            // create api
        }
    };

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
                    <Grid>
                        <Tooltip title={mood.displayName}>
                            <Paper 
                                className={classes.moodGrid}
                                sx={{
                                    border: selectedMood === mood.id
                                        ? "2px solid #66BB6A"
                                        : undefined,
                                }}
                                onClick={() => setSelectedMood(mood.id)}
                                elevation={selectedMood === mood.id ? 4 : 0}
                            >
                                <img
                                    src={mood.image}
                                    alt={mood.displayName}
                                    width={42}
                                    height={42}
                                />
                            </Paper>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>

            <Tooltip title="Save">
            <Fab 
            color="primary"
            sx={{
                position: "absolute",
                bottom: 24,
                right: 24,
            }}
            onClick={handleSave}>
                <CheckIcon/>
            </Fab>
            </Tooltip>
        </StyledPaper>
    );
}