import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCV from "./pages/CreateCV";
import PreviewCV from "./pages/PreviewCV";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCV />} />
            <Route path="/preview" element={<PreviewCV />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;