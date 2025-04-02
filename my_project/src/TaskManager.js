import React, { useState } from "react";
import './styles/TaskManager.css'
const TaskManager = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("High Priority");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (!task || !date) return alert("Please enter task and date.");
    const newTask = { task, priority, date };
    setTasks([...tasks, newTask]);
    setTask("");
    setDate("");
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const editedTask = tasks[index];
    setTask(editedTask.task);
    setPriority(editedTask.priority);
    setDate(editedTask.date);
    handleDelete(index);
  };

  return (
    <div className="task-container">
      <h2>Task Dashboard</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High Priority</option>
          <option>Medium Priority</option>
          <option>Low Priority</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className="task-list">
        {["High Priority", "Medium Priority", "Low Priority"].map((prio) => (
          <div key={prio} className="task-category">
            <h3>{prio} Tasks</h3>
            {tasks.filter((t) => t.priority === prio).length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              tasks
                .filter((t) => t.priority === prio)
                .map((t, index) => (
                  <div key={index} className="task-card">
                    <p><strong>{t.task}</strong></p>
                    <p>📅 {t.date}</p>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>
                      🗑️ Delete
                    </button>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
