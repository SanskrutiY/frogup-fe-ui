import React, { useState } from 'react';
import { Box, TextField, Tooltip, Popover, Typography } from '@mui/material';
import { IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { DatePicker } from '@mui/x-date-pickers';

// the search bar on top left
export default function SearchBar(){
    const [openSingleDate, setOpenSingleDate] = useState(false);
    const [openFromDate, setOpenFromDate] = useState(false);
    const [openCalDialog, setOpenCalDialog] = useState(null);
    const [calendarType, setCalendarType] = useState(null); // "single" | "from"

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* Search Bar */}
            <TextField 
                sx={{flex: 1}}
                placeholder="Search notes..."/>

            {/* Calendar (single date) */}
            <Tooltip title="On date">
            <IconButton onClick={(e) => {
                setCalendarType("single");
                setOpenCalDialog(e.currentTarget);
                }}>
                <CalendarMonthIcon />
            </IconButton>
            </Tooltip>

            {/* From date to now */}
            <Tooltip title="From date">
            <IconButton onClick={(e) => {
                setCalendarType("from");
                setOpenCalDialog(e.currentTarget)
                }}>
                <DateRangeIcon />
            </IconButton>
            </Tooltip>

            <Popover
                open={Boolean(openCalDialog)}
                anchorEl={openCalDialog}
                onClose={() => setOpenCalDialog(null)}
            >
                <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {calendarType === "single" ? "On Date" : "From Date"}
                    </Typography>

                    <DatePicker
                        slotProps={{
                            textField: {
                                size: "small",
                            },
                        }}
                        onChange={(date) => {
                            if (calendarType === "single") {
                                // API 1
                            } else {
                                // API 2
                            }
                            setOpenCalDialog(null);
                        }}
                    />
                </Box>
            </Popover>
        </Box>
        </LocalizationProvider>
    );
}