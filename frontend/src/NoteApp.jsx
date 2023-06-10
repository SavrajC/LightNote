// import { useState, useEffect } from "react";
// import axios from 'axios';
// import Results from "./Results";

// const NoteApp = () => {
//     // const [content, setContent] = useState("");
//     // const [tag, setTag] = useState([]);
//     // const [title, setTitle] = useState("");
//     // const [time, setTime] = useState("");
//     const [notes, setNotes] = useState([]);

//     useEffect(() => {
//         requestNotes();
//     }, [])

//     async function requestNotes(){
//         const response = await axios.get('https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note')
//         const json = await response.json();
//         console.log(json);
//         setNotes(json)
//     }
//     return(
//         <div>
//             <Results note={notes} />
//         </div>
//     )
// }

// export default NoteApp;

import { useState, useEffect } from "react";
import axios from 'axios';
import Results from "./Results";

const NoteApp = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        requestNotes();
    }, []);

    async function requestNotes(){
        try {
            const response = await axios.get('https://l7flqpsmca.execute-api.us-west-2.amazonaws.com/user/1/note');
            const json = response.data;
            console.log(json);
            setNotes(json);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Results notes={notes} />
        </div>
    );
}

export default NoteApp;
