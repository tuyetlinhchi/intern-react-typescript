import "./App.css";
import MentorLayout from "./components/Mentor/MentorLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import InternLayout from "./components/Intern/InternLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="mentor" element={<MentorLayout />} />
          <Route path="intern" element={<InternLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
