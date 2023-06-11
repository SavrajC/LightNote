import Note from "./Note";

const Results = ({notes}) => {
    console.log("test: \n" + notes);
    console.log(notes[1])
    return (
        <div className="results">
            <h1 className="titleCard"> Light Notes</h1>
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

