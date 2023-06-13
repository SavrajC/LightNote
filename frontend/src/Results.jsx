import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Note from "./Note";
import SearchModal from "./SearchModal";

const Results = ({ setContent, setTitle, setTime, setTags, setNoteID }) => {
  const [updatedNotes, setUpdatedNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await axios.get(
        "https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note"
      );
      const json = response.data;
      console.log(json);
      setUpdatedNotes(json);
    } catch (error) {
      console.error(error);
    }
  }

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

  const deleteNote = (noteID) => {
    axios
      .delete(
        `https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note/${noteID}`
      )
      .then((response) => {
        console.log("Note deleted:", response);
        const updatedNotesList = updatedNotes.filter(
          (note) => note.noteID !== noteID
        );
        setUpdatedNotes(updatedNotesList);
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
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
              setTitle={setTitle}
              setTime={setTime}
              setTags={setTags}
              setNoteID={setNoteID}
              onDeleteNote={deleteNote}
            />
          ))
        ) : (
          <h1>No notes Found</h1>
        )}
      </div>

      <button className="new-note-button" onClick={createNewNote}>
        <FontAwesomeIcon icon={faPlusCircle} className="plus-icon" />
        <span className="button-text">Create New Note</span>
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
