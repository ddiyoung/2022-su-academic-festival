import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Select from "./pages/Select";
import Input from "./pages/Input";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Index from "./pages/Index";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<Index />} />
        <Route path="/select" element={<Select />} />
        <Route path="/input" element={<Input />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}
