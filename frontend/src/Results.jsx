import React from "react";
import Note from "./Note";

const Results = ({ notes, setContent, setTitle, setTime, setTags }) => {


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
            setContent = {setContent}
            setTitle={setTitle} 
            setTime={setTime} 
            setTags = {setTags} 
          />
        ))
      ) : (
        <h1>No notes Found</h1>
      )}
    </div>
  );
};

export default Results;


