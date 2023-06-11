import React from "react";

const Note = ({ noteTitle, tags, time,noteContent, setContent , setTitle, setTime, setTags}) => {
  const handleNoteClick = () => {
    setContent(noteContent);
    setTitle(noteTitle);
    setTime(time);
    setTags(tags);
  };
  console.log("Note BP 1: " + noteContent)
  console.log("Note Time 2: " + time)
  console.log("Note Title 3: " + noteTitle)
  console.log("Note Tags 4: " + tags)
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
          <h2>No Tags Found</h2>
        )}
      </div>
    </div>
  );
};

export default Note;
