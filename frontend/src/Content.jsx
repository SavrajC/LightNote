import React, { useState } from "react";
import axios from "axios";

const Content = ({ initialContent, initialTime, initialTitle, initialTags, noteID }) => {
  const [content, setContent] = useState(initialContent);
  const [time, setTime] = useState(initialTime);
  const [title, setTitle] = useState(initialTitle);
  const [tags, setTags] = useState(initialTags);
  console.log("Content BP 1: " + initialContent)
    console.log("Content Time 2: " + time)
    console.log("Content Title 3: " + title)
    console.log("Content Tags 4: " + tags)

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const updateContent = (content, time, title, tags) => {
    const apiUrl = `https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note/${noteID}`;

    const requestBody = {
      noteContent: content,
      noteTitle: title,
      tags: tags
    };

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        console.log("API response:", response.data);
        // Handle the response data or perform any additional actions
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle the error or display an error message
      });
  };

  const handleSave = () => {
    updateContent(content, time, title, tags);
  };

  return (
    <div className="content" style={{ backgroundColor: "#0e1420", color: "#ffffff", padding: "10px" }}>
      <h2>Content:</h2>
      <input type="text" value={title} onChange={handleTitleChange} style={{ backgroundColor: "#0e1420", color: "#ffffff" }} />
      <textarea defaultValue={content} onChange={handleContentChange} style={{ backgroundColor: "#0e1420", color: "#ffffff" }}></textarea>
      <input type="text" value={time} onChange={handleTimeChange} style={{ backgroundColor: "#0e1420", color: "#ffffff" }} />
      <input type="text" value={tags} onChange={handleTagsChange} style={{ backgroundColor: "#0e1420", color: "#ffffff" }} />
      <button onClick={handleSave} style={{ backgroundColor: "#0e1420", color: "#ffffff", padding: "10px 20px", borderRadius: "3px", border: "1px solid #ffffff", marginTop: "10px" }}>Save</button>
    </div>
  );
};

export default Content;

