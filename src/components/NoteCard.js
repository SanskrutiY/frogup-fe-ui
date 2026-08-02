import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { MOOD } from "../constants/Mood";
import { colors } from "../theme/palette";
import DeleteIcon from '@mui/icons-material/Delete';
import * as repository from '../repository/index';
import { useSnackbar } from 'notistack';

// left hand side notes card list 
export default function NoteCard({note, onClick}){

    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const mood = MOOD.find(
        (m) => m.displayName === note?.mood
    );

    const handleNoteDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            // call delete API
            repository.deleteNoteById(
                note?.noteId,
                (response) => {
                    setData(response);
                    enqueueSnackbar("Deleted successfully!", {
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
            window.location.reload();
        }
    };
    
    return(
        <Card 
            onClick={onClick}
            sx={{
                bgcolor: colors.darkPaper,
                cursor: "pointer",
                borderRadius: 3,
                transition: "0.2s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                },
            }}
        >
            <CardContent>

            {/* Image and Title */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box>
                    <img
                        src={mood?.image}
                        alt={mood?.displayName}
                        width={64}
                        height={64}
                    />
                </Box>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    <Typography variant="h6">
                        {note?.noteTitle}
                    </Typography>
                </Box>

                {/* Delete button */}
                <Box 
                    sx={{
                        display:"flex",
                        justifyContent:"flex-end",
                        mt:1,
                        position: "absolute",
                        top: 10,
                        right: 10,
                    }}
                >
                    <IconButton onClick={handleNoteDelete} size="small" sx={{ "&:hover": {color: "#d32f2f"} }}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </Box>
            </Box>

            {/* Content */}
                <Typography
                    sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left",
                    }}
                >
                    {note?.noteContent}
                </Typography>

            {/* Mood and Date */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography>
                    Mood: {note?.mood}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                    Last edited on: {new Date(note?.updatedOn).toLocaleString()}
                </Typography>
            </Box>

            </CardContent>
        </Card>
    );
}