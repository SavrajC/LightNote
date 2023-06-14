import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import Content from "./Content";

const NoteApp = (user, signOut) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [noteID, setNoteID] = useState("");
  //   console.log("User: " + user);
  const output = JSON.stringify(user);
  var u = JSON.parse(output);
  console.log(u);
  var userName = u.user.username;
  console.log("Username: " + userName);

  useEffect(() => {
    requestNotes();
  }, []);

  async function requestNotes() {
    try {
      const response = await axios.get(
        `https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/${userName}/note`
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
      <Results
        notes={notes}
        setContent={setContent}
        setTitle={setTitle}
        setTime={setTime}
        setTags={setTags}
        setNoteID={setNoteID}
        requestNotes={requestNotes}
        userName={userName}
      />

      <Content
        setContent={setContent}
        setTitle={setTitle}
        setTime={setTime}
        setTags={setTags}
        setNoteID={setNoteID}
        content={content}
        title={title}
        time={time}
        tags={tags}
        noteID={noteID}
        userName={userName}
        signOut={signOut}
      />
    </div>
  );
};

export default NoteApp;
