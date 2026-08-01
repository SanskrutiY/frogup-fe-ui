import React, { forwardRef } from 'react';
import NoteForm from './NoteForm';

// how it looks when you view the note on click (detailed view)
const NoteView = forwardRef(({ note }, ref) => {
    return(
        <>
        <NoteForm note={note} ref={ref}/>
        </>
    );
});

export default NoteView;