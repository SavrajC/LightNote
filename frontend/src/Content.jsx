import React, { useState, useEffect } from "react";
import axios from "axios";

const Content = ({ content, time, title,noteID,tags }) => {
  // Convert epoch time to a Date object
  const formattedTime = new Date(time).toLocaleString();

  // State variables to track the edited title and content
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // Update the editedTitle state when the title prop changes
  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  // Event handlers for title and content change
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  // Event handler for saving the data
  const handleSave = () => {
    console.log("Content pagenoteTitle: " + editedTitle)
    console.log("Content page noteid: " + noteID)
    console.log("Content page tags: " + tags)
    console.log("Content page noteContenr: " + editedContent)
    // Create the data object to be sent in the API request
    const data = {
      noteTitle: editedTitle,
      noteContent: editedContent,
      tags: tags,
    };

    // Make the API request using Axios
    axios
      .post(`https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note/${noteID}`, data)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div className="content">
      <h2 className="note-header">
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          className="title-input"
        />
        <button className="note-submit" onClick={handleSave}>
          Save
        </button>
      </h2>
      <textarea
        className="content-textarea"
        defaultValue={content}
        onChange={handleContentChange}
      ></textarea>
      <h3 className="timeDisplay">{formattedTime}</h3>
    </div>
  );
};

export default Content;

