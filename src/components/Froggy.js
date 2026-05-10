import "./Froggy.css";
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import NoteView from './NoteView';
import SearchBar from './SearchBar';

// main alignment page
export default function Froggy(){

    return(
    <div className="app-container">
      {/* Left Panel */}
        <div className="sidebar">
            <div className="app-name">
                <h2>App Name</h2>
                <button className='toggle-theme'>🌙</button>
            </div>
        <SearchBar/>
        <NoteList/>
        </div>

      {/* Middle Panel */}
        <div className="main-content">
        <p className="placeholder-text">
            Some image <br />
            <span className="subtext">
                (but whenever I click on the already written notes... it will open
                here)
            </span>
            {/* We need 3 states --
            - noNoteOpen
            - viewMode (!editMode)
            - editMode */}
            <NoteForm/>
            <NoteView/>
        </p>
        </div>

      {/* Right Panel */}
        <div className="extra-panel">
            <p>Will upgrade later</p>
        </div>
    </div>
    );  
};