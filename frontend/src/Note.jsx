import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Note = ({
  noteTitle,
  noteID,
  tags,
  time,
  noteContent,
  setContent,
  setTitle,
  setTime,
  setTags,
  setNoteID,
  onDeleteNote,
}) => {
  const handleNoteClick = () => {
    setContent(noteContent);
    setTitle(noteTitle);
    setTime(time);
    setTags(tags);
    setNoteID(noteID);
  };

  const deleteNote = () => {
    axios
      .delete(
        `https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note/${noteID}`
      )
      .then((response) => {
        console.log("Note deleted:", response);
        onDeleteNote(noteID); // Callback function to update the notes list after deletion
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="noteCard" onClick={handleNoteClick}>
      <h1 className="noteTitle">{noteTitle}</h1>
      <div className="tagsContainer">
        {tags && tags.length ? (
          tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))
        ) : (
          <></>
        )}
      </div>
      <button className="delete-button" onClick={deleteNote}>
        <FontAwesomeIcon icon={faTimes} className="delete-icon" />
      </button>
    </div>
  );
};
7;
export default Note;
