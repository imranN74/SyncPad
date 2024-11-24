import { TextEditor } from "./pages/TextEditor";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:key" element={<TextEditor />} />
      </Routes>
    </>
  );
}

export default App;
