import {createRoot} from "react-dom/client"
import NoteApp from "./NoteApp";

const App = () => {
  return (
    <div>
      <NoteApp />
    </div>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
