import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = ({
  content,
  time,
  title,
  noteID,
  tags,
  setContent,
  setTags,
  setTitle,
}) => {
  console.log("Content pagenoteTitle: " + title);
  console.log("Content page noteid: " + noteID);
  console.log("Content page tags: " + tags);
  console.log("Content page noteContenr: " + content);

  // Convert epoch time to a Date object
  const formattedTime = new Date(time).toLocaleString();

  // State variables to track the edited title, content, and tags
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedTags, setEditedTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Update the editedTitle, editedContent, and editedTags state when the respective props change
  useEffect(() => {
    setEditedTitle(title);
    setEditedContent(content);
    setEditedTags(tags);
  }, [title, content, tags]);

  // Event handlers for title, content, and tags change
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setEditedTags(value ? value.split(",") : []);
  };

  // Event handler for saving the data
  // Event handler for saving the data
  const handleSave = () => {
    if (!isSaving) {
      setIsSaving(true);
      setTitle(editedTitle);
      setContent(editedContent);
      setTags(editedTags);

      console.log("Content pagenoteTitle: " + editedTitle);
      console.log("Content page noteid: " + noteID);
      console.log("Content page tags: " + editedTags);
      console.log("Content page noteContenr: " + editedContent);

      // Create the data object to be sent in the API request
      const data = {
        noteTitle: editedTitle,
        noteContent: editedContent,
        tags: editedTags,
      };

      // Make the API request using Axios
      axios
        .post(
          `https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note/${noteID}`,
          data
        )
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          toast("Saved", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            setIsSaving(false);
          }, 5000); // Allow saving again after 5 seconds
        })
        .catch((error) => {
          console.error("Error saving data:", error);

          setIsSaving(false);
        });
    }
  };

  // Save the content when the component is unmounted
  useEffect(() => {
    return () => {
      handleSave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Event handler for Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isSaving) {
        setIsSaving(true);
        handleSave();
        setTimeout(() => {
          setIsSaving(false);
        }, 5000); // Allow saving again after 30 seconds
      } else {
        toast("Wait 5 seconds to save", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
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
        <label htmlFor="tagsInput" className="tags-title">
          Tags:{" "}
        </label>
        <input
          className="tags-input"
          type="text"
          id="tagsInput"
          value={editedTags?.join(",") ?? ""}
          onChange={handleTagChange}
        />
        <button
          className="note-submit"
          onClick={handleSave}
          disabled={isSaving}
        >
          Save
        </button>
      </h2>
      <textarea
        className="content-textarea"
        value={editedContent}
        onChange={handleContentChange}
        onKeyPress={handleKeyPress}
      ></textarea>
      <h3 className="timeDisplay">{formattedTime}</h3>
      <ToastContainer />
    </div>
  );
};

export default Content;
