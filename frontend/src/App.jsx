import {createRoot} from "react-dom/client"
import NoteApp from "./NoteApp";

const App = () => {
  return (
    <div>
      <h1>Light Notes</h1>
      <NoteApp />
    </div>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
