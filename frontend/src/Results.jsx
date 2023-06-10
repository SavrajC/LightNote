// import Note from "./Note";

// const Results = ({notes}) => {
//     console.log(notes)
//     return (
//         <div className="search">
//             {!notes.length ? (
//                 <h1>No notes Found</h1>
//             ) : (notes.map(note => (
//                 <Note 
//                 name={note.noteTitle} 
//                 animal={note.animal} 
//                 breed={note.breed} 
//                 images={note.images}
//                 location={`${note.city}, ${note.state}`}
//                 key={note.id}/>
//             )))}
//         </div>
//     )
// }

// export default Results

import Note from "./Note";

const Results = ({notes}) => {
    console.log("test: \n" + notes);
    console.log(notes[1])
    return (
        <div className="search">
            {notes && notes.length ? (
            
                notes.map((note) => (
            
                    <Note
                        noteTitle={note.noteTitle}
                        tags={note.tags}
                        time={note.timeCreated}
                        noteContent={note.noteContent}
                        key={note.noteID}
                    />
                ))
            ) : (
                <h1>No notes Found</h1>
            )}
        </div>
    );
};

export default Results;

