import React from "react";

const Content = ({ content,time, title,tags }) => {
    console.log("Content BP 1: " + content)
    console.log("Content Time 2: " + time)
    console.log("Content Title 3: " + title)
    console.log("Content Tags 4: " + tags)
  return (
    <div className="content">
      <h2>Content:</h2>
      <p>{title}</p>
      <p>{content}</p>
      <p>{time}</p>
      <p>{tags}</p>
      
    </div>
  );
};

export default Content;