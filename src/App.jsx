import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./routes/TaskManager";
import ArchivedTasks from "./routes/ArchivedTasks";
import Footer from "./components/Footer"
import NewsTicker from "./components/NewsComp";

const App = () => {
  return (
    <>
    <NewsTicker />
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