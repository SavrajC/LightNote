
const Note = ({noteTitle, time, noteContent,tags}) => {
    return (
         <div>
           <h1>{noteTitle}</h1>
           <h2>
              {time}
           </h2>
           <h2>
              {tags}
           </h2>
           <textarea defaultValue={noteContent}></textarea>
         </div>
        
       );
}

export default Note;