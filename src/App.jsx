import React, { use, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

function ToDoList() {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [bool, setBool] = useState(false);
  const [value, setValue] = useState("All");
  const inputRef = useRef(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTask((t) => [
        ...t,
        { id: Date.now(), text: newTask, completed: false },
      ]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    if (window.confirm("are you sure?")) {
      const updatedTask = tasks.filter((_, i) => i !== index);
      setTask(updatedTask);
    }
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index - 1]] = [
        updatedTask[index - 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index + 1]] = [
        updatedTask[index + 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
    }
  }
  const filteredTask = tasks.filter((t) => {
    if (value === "All") return true;

    if (value === "Completed") return t.completed;

    if (value === "Pending") return !t.completed;
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setBool(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="to-do-list">
        <h1>TODO LIST</h1>
        <AnimatePresence mode="wait">
          {bool == false ? (
            <motion.div
              className="task-option-header"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="btn-add"
                onClick={() => setBool(!bool)}
                key="menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Task
              </motion.button>
              <select
                name="select"
                id="select-task"
                className="select-task"
                onChange={(e) => setValue(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="form" ref={inputRef}>
                <input
                  type="text"
                  id="input"
                  placeholder="Input New Task.."
                  autoFocus
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTask();
                    }
                  }}
                />
                <button className="add-button" onClick={addTask}>
                  Add
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ol>
          {filteredTask.map((task, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <li key={index}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    setTask(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, completed: !t.completed } : t
                      )
                    )
                  }
                />
                <span className={`text ${task.completed ? "lineThrough" : ""}`}>
                  {task.text}
                </span>
                <div className="container-button">
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveTaskUp(index)}
                  >
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveTaskDown(index)}
                  >
                    <i className="fa-solid fa-arrow-down"></i>
                  </button>
                </div>
              </li>
            </motion.div>
          ))}
        </ol>
      </div>
    </>
  );
}

export default ToDoList;
