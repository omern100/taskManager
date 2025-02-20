import React, { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";

const AddTask = ({ collectionRef }) => {
  const [createTask, setCreateTask] = useState("");
  const [priority, setPriority] = useState(1);

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collectionRef, {
        task: createTask,
        isChecked: false,
        timestamp: serverTimestamp(),
        priority: parseInt(priority),
        archived: false,
      });
      setCreateTask("");
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
        data-bs-target="#addTask"
      >
        Add Task
      </button>
      <div
        className="modal fade"
        id="addTask"
        tabIndex="-1"
        aria-labelledby="addTaskLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={submitTask} className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addTaskLabel">
                  Add Task
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
                  placeholder="Add a Task"
                  value={createTask}
                  onChange={(e) => setCreateTask(e.target.value)}
                />
                <label>Priority: </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
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
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;