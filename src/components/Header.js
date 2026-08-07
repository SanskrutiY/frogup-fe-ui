import React from 'react';
import { Box, Typography } from '@mui/material'
import { IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { happyFrog } from "../assets/frogs";

export default function Header() {

    const handleToggleTheme = () => {
        alert("Dark Mode coming soon");
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src={happyFrog} alt="logo" width={40} />
                <Typography variant='h5' fontWeight={700} color='primary'>
                    NoTeker
                </Typography>
            </Box>
            <IconButton onClick={handleToggleTheme}>
                <DarkModeIcon/>
            </IconButton>
        </Box>
    )
}