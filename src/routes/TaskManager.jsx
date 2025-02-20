import React, { useEffect, useState } from "react";
import { db } from "../services/firebase.config";
import { collection, getDocs, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTask";
import Navbar from "../components/Navbar";
import TaskSearch from "../components/TaskSearch";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortBy, setSortBy] = useState("timestamp");
  const collectionRef = collection(db, "tasks");

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    setFilteredTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = async (id) => {
    try {
      const documentRef = doc(db, "tasks", id);
      await deleteDoc(documentRef);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setFilteredTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      console.log("Task deleted from Firestore:", id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        console.log("Fetching tasks, sorting by:", sortBy);
        const q = query(collectionRef, orderBy(sortBy));
        const taskSnapshot = await getDocs(q);
        const tasksData = taskSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Fetched tasks:", tasksData);
        setTasks(tasksData);
        setFilteredTasks(tasksData);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    getTasks();
  }, [sortBy]);

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    const filtered = tasks.filter((task) => {
      const taskText = task.task || "";
      return taskText.toLowerCase().includes(searchTerm.toLowerCase());
    });
    console.log("Filtered tasks:", filtered);
    setFilteredTasks(filtered);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const activeTasks = filteredTasks.filter((task) => !task.isChecked && !task.archived);
  const completedTasks = filteredTasks.filter((task) => task.isChecked && !task.archived);

  return (
    <div className="container">
      <Navbar />
      <div className="row col-md-12">
        <div className="card card-white">
          <div className="card-body">
            <h1>Task Manager</h1>
            <TaskSearch onSearch={handleSearch} />
            <div className="sort-container">
              <label>Sort by: </label>
              <select value={sortBy} onChange={handleSortChange}>
                <option value="timestamp">Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <TaskList tasks={activeTasks} setTasks={setTasks} updateTask={updateTask} deleteTask={deleteTask} />
            {completedTasks.length > 0 && <h2>Completed Tasks</h2>}
            <TaskList tasks={completedTasks} setTasks={setTasks} updateTask={updateTask} deleteTask={deleteTask} />
            <AddTaskModal collectionRef={collectionRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;