import React, { useState, useEffect } from "react";
import Note from "./Note";
import SearchModal from "./SearchModal";
import axios from "axios";

const Results = ({
  notes,
  setContent,
  setTitle,
  setTime,
  setTags,
  setNoteID,
}) => {
  const [updatedNotes, setUpdatedNotes] = useState([]);

  useEffect(() => {
    setUpdatedNotes(notes || []);
  }, [notes]);

  const createNewNote = () => {
    const data = {
      noteTitle: "blank note",
      noteContent: "",
      tags: ["blank"],
    };
    axios
      .post(
        "https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note",
        data
      )
      .then((response) => {
        const newNote = response.data.params.Item;

        const updatedNotesList = [...updatedNotes, newNote];
        setUpdatedNotes(updatedNotesList);

        // Update the content using the callback function
        updateContent(newNote);
      })
      .catch((error) => {
        console.error("Error creating new note:", error);
      });
  };

  const updateContent = (newNote) => {
    console.log("Update Content Response: " + newNote.noteContent);
    setContent(newNote.noteContent);
    setTitle(newNote.noteTitle);
    setTime(newNote.timeCreated);
    setTags(newNote.tags);
    setNoteID(newNote.noteID);
  };

  return (
    <div className="results">
      <h1 className="titleCard">Light Notes</h1>

      <div className="notes-container">
        {updatedNotes && updatedNotes.length ? (
          updatedNotes.map((note) => (
            <Note
              noteTitle={note.noteTitle}
              tags={note.tags}
              time={note.timeCreated}
              noteContent={note.noteContent}
              noteID={note.noteID}
              key={note.noteID}
              setContent={setContent}
              setTitle={setTitle} // Make sure this function is correctly updating the state
              setTime={setTime}
              setTags={setTags}
              setNoteID={setNoteID}
            />
          ))
        ) : (
          <h1>No notes Found</h1>
        )}
      </div>
      <button className="new-note-button" onClick={createNewNote}>
        Create New Note
      </button>
      <SearchModal
        notes={updatedNotes}
        setContent={setContent}
        setTitle={setTitle}
        setTime={setTime}
        setTags={setTags}
      />
    </div>
  );
};

export default Results;
