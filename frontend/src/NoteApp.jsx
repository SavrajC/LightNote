import React, { useState,useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import Content from "./Content";

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");


  useEffect(() => {
    requestNotes();
  }, []);

  async function requestNotes() {
    try {
      const response = await axios.get(
        "https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note"
      );
      const json = response.data;
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Results notes={notes} 
      setContent={setContent} 
      setTitle={setTitle} 
      setTime={setTime} 
      setTags = {setTags} />
      
      <Content content={content} 
      title = {title} 
      time = {time} 
      ags ={tags} />
    </div>
  );
};

export default NoteApp;
