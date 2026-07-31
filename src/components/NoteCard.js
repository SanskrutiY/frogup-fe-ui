import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

// left hand side notes card list 
export default function NoteCard({note, onClick}){
    
    return(
        <Card onClick={onClick}>
            <CardContent>
                <Typography variant="h6">{note?.noteTitle}</Typography>
                {/* <Typography>{note?.noteContent}</Typography> */}
                <Typography> 🐸 {note?.mood}</Typography>
                <Typography variant="body2" color="text.secondary">{new Date(note?.createdOn).toLocaleString()}</Typography>
            </CardContent>
        </Card>
    );
}