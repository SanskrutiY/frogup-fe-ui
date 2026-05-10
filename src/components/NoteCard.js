import "./NoteCard.css";

// left hand side notes card list 
export default function NoteCard({note}){
    return(
        <div className='note-card'>
            <div className='note-header'>
                <span>{note?.mood}</span>
                <span>{new Date(note.createdOn).toLocaleString()}</span>
            </div>

            <h2 className='note-title'>{note.noteTitle}</h2>

            {/* {note.noteContent && (
                <h3 className='note-content'>{note.noteContent}</h3>
            )} */}
        </div>
    );
}