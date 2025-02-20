import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./routes/TaskManager";
import ArchivedTasks from "./routes/ArchivedTasks";
import Footer from "./components/Footer"
import Header from "./components/Header"

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/archive" element={<ArchivedTasks />} />
      </Routes>
    </Router>
      <Footer />
    </>
  );
};

export default App;