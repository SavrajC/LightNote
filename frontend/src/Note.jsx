const Note = ({ noteTitle, tags }) => {
    return (
      <div className="noteCard">
        <h1 className="noteTitle">{noteTitle}</h1>
  
        <h2 className="tagsContainer">
          {tags && tags.length ? (
            tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))
          ) : (
            <h2>No Tags Found</h2>
          )}
        </h2>
      </div>
    );
  };
  
  export default Note;
  