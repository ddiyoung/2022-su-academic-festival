import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Select from "./pages/Select";
import Input from "./pages/Input";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/input" element={<Input />} />
      </Routes>
    </Router>
  );
}
