import React, { useState } from "react";
import { db } from "../services/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const EditTaskModal = ({ task, id, priority }) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [updatedPriority, setUpdatedPriority] = useState(priority);

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const taskDocument = doc(db, "tasks", id);
      await updateDoc(taskDocument, {
        task: updatedTask,
        priority: parseInt(updatedPriority),
        isChecked: false,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${id}`}
      >
        Update
      </button>
      <div
        className="modal fade"
        id={`id${id}`}
        tabIndex="-1"
        aria-labelledby="updateTaskLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="updateTaskLabel">
                  Update Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Update a Task"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                />
                <label>Priority: </label>
                <select
                  value={updatedPriority}
                  onChange={(e) => setUpdatedPriority(e.target.value)}
                  className="form-control"
                >
                  <option value={1}>1 (High)</option>
                  <option value={2}>2 (Medium)</option>
                  <option value={3}>3 (Low)</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={updateTask}
                >
                  Update Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTaskModal;