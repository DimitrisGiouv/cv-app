import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCV from "./pages/CreateCV";
import PreviewCV from "./pages/PreviewCV";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCV />} />
        <Route path="/preview" element={<PreviewCV />} />
      </Routes>
    </Router>
  );
}

export default App;