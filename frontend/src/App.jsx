import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Properties from "./components/Properties";
import Dashboard from "./components/Dashboard";
import SingleProperty from "./components/SingleProperty";

function App() {
  const title = "Airbnc";
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<SingleProperty />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
