import React from 'react';
import { Box, Typography } from '@mui/material';
import { main } from "../assets/frogs";

export default function MainShowPage() {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: 3,
            }}
        >
            <Typography variant="h6" fontWeight={600}>
                " Whatever you're feeling, there's a frog for it. "
            </Typography>
            <img 
                src={main} 
                alt="FrogUp"
                width={670}
            />
        </Box>
    );
}