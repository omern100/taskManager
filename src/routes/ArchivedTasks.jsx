import React, { useEffect, useState } from "react";
import { db } from "../services/firebase.config";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

const ArchivedTasks = () => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const collectionRef = collection(db, "tasks");

  const updateTask = (updatedTask) => {
    setArchivedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = async (id) => {
    try {
      const documentRef = doc(db, "tasks", id);
      await deleteDoc(documentRef);
      setArchivedTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      console.log("Task deleted from Firestore:", id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    const getArchivedTasks = async () => {
      try {
        const q = query(collectionRef, where("archived", "==", true));
        const taskSnapshot = await getDocs(q);
        const tasksData = taskSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Fetched archived tasks:", tasksData);
        setArchivedTasks(tasksData);
      } catch (err) {
        console.error("Error fetching archived tasks:", err);
      }
    };
    getArchivedTasks();
  }, [collectionRef]);

  return (
    <div className="container">
      <Navbar />
      <div className="row col-md-12">
        <div className="card card-white">
          <div className="card-body">
            <h1>Archived Tasks</h1>
            <TaskList
              tasks={archivedTasks}
              setTasks={setArchivedTasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedTasks;