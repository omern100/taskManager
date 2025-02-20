import React, { useState } from "react";

const TaskSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default TaskSearch;