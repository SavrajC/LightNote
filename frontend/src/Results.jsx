
import React from "react";
import Note from "./Note";
import SearchModal from "./SearchModal";


const Results = ({ notes, setContent, setTitle, setTime, setTags,setNoteID }) => {
    console.log(notes[0])
  return (
    <div className="results">
      <h1 className="titleCard">Light Notes</h1>
      {notes && notes.length ? (
        notes.map((note) => (
          <Note
            noteTitle={note.noteTitle}
            tags={note.tags}
            time={note.timeCreated}
            noteContent={note.noteContent}
            key={note.noteID}
            noteID={note.noteID}
            setContent = {setContent}
            setTitle={setTitle} 
            setTime={setTime} 
            setTags = {setTags} 
            setNoteID = {setNoteID}
          />
        ))
      ) : (
        <h1>No notes Found</h1>
      )}
      <SearchModal
            notes={notes}
            setContent = {setContent}
            setTitle={setTitle} 
            setTime={setTime} setTags = {setTags} />
       
    </div>
  );
};

export default Results;


