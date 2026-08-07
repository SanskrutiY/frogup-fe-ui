import React, { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Tooltip, Popover, Typography } from '@mui/material';
import { IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { DatePicker } from '@mui/x-date-pickers';
import Fuse from 'fuse.js'
import * as repository from '../repository/index';

export default function SearchBar({setFilteredNotes, allNotes}){
    const [query, setQuery] = useState(""); // whatever the user search for
    const [openCalDialog, setOpenCalDialog] = useState(null);
    const [calendarType, setCalendarType] = useState(null); // "single" | "from"
    const [error, setError] = useState("");

    // const options = {
    //     keys: ['noteTitle', 'noteContent'],
    //     includeScore: true
    // };
    // const fuse = new Fuse(allNotes, options);

    // without memoization -> new Fuse object is created on every render
    // Creating Fuse isn't free — it builds an index of all your notes.
    // memoization -> means remembering the created object -> reuses the object every render
    // If allNotes didn't change → reuse the same Fuse object.
    // If allNotes changed → create a new one and remember that instead.
    const fuse = useMemo(() => {
        // Memorize is a standard English word meaning to commit something to memory, 
        // while memoize is a specialized technical term in computer science 
        // meaning to cache the results of expensive function calls.
        return new Fuse(allNotes, {
            keys: ['noteTitle', 'noteContent'],
            includeScore: true
        });
    }, [allNotes]);
    // const results = query ? fuse.search(query) : [];
    useEffect(() => {
        if(!query.trim()){
            setFilteredNotes(allNotes);
            return;
        }
        setFilteredNotes(
            // fuse.search(query) does not return your notes directly
            // it returns item:{notes}, score: how closely it matched
            fuse.search(query).map(result => result.item)
        );
    }, [query, fuse, allNotes, setFilteredNotes]);

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* Search Bar */}
            <TextField 
                sx={{flex: 1}}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                // You actually don't need handleFocus anymore.
                // Earlier, you used it because you were fetching notes only when the search bar was focused.
                // Now:    Froggy fetches all notes on page load.
                //         SearchBar already receives allNotes.
                // onFocus={handleFocus}
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
                            if (!date) return;
                            const formattedDate = date.format("YYYY-MM-DD");
                            // bug is that these apis give the deleted = 1 notes also
                            // but jaude aata sathi
                            if (calendarType === "single") {
                                repository.getByParticularDate(
                                    formattedDate,
                                    setFilteredNotes,
                                    setError
                                );
                            } else {
                                repository.getFromParticularDate(
                                    formattedDate,
                                    setFilteredNotes,
                                    setError
                                );
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