import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, setTasks, updateTask, deleteTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          setTasks={setTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;