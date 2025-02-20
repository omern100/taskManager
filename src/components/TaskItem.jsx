import React from "react";
import { db } from "../services/firebase.config";
import { doc, runTransaction, updateDoc } from "firebase/firestore";
import EditTaskModal from "./EditTask";

const TaskItem = ({ id, task, isChecked, timestamp, priority, archived, setTasks, updateTask, deleteTask }) => {
  const checkBoxHandler = async () => {
    try {
      const docRef = doc(db, "tasks", id);
      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(docRef);
        if (!taskDoc.exists()) throw new Error("Document does not exist");

        const newChecked = !taskDoc.data().isChecked;
        let updates = { isChecked: newChecked };

        // אם המשימה מאורכבת וה-checkbox הוסר, נשנה גם את archived ל-false
        if (archived && !newChecked) {
          updates.archived = false;
        }

        transaction.update(docRef, updates);

        // עדכון ה-UI דרך ה-updateTask
        updateTask({ id, ...updates });

        console.log("Updated in Firestore:", updates);
      });
    } catch (err) {
      console.error("Failed to check task:", err);
    }
  };

  const archiveTask = async () => {
    try {
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, { archived: true });

      // עדכון ה-UI דרך updateTask
      updateTask({ id, archived: true });

      console.log("Task archived in Firestore:", id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?!?!?");
    if (!confirmDelete) return;

    // קריאה לפונקציית ה-deleteTask
    await deleteTask(id);
  };

  return (
    <div className="todo-list">
      <div className="todo-item">
        <hr />
        <div className="todo-content">
          <div className="checker-container">
            <div className="checker">
              <span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={checkBoxHandler}
                  name={id}
                />
              </span>
            </div>
          </div>
          <div className="task-details">
            <span className={isChecked ? "done" : ""}>
              {task} <br />
              <i>{new Date(timestamp?.seconds * 1000).toLocaleString("en-GB")}</i>
              <br />
              <span className="task-priority">Priority: {priority}</span>
            </span>
          </div>
          <span className="task-actions float-end mx-3">
            <EditTaskModal task={task} id={id} priority={priority} />
            {isChecked && !archived && (
              <button className="btn btn-warning mx-2" onClick={archiveTask}>
                Archive
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={handleDelete}
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;