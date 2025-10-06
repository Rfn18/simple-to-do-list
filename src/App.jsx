import React, { use, useState } from "react";
import "./App.css";

function ToDoList() {
  const [task, setTask] = useState(["makan", "minum"]);
  const [newTask, setNewTask] = useState("");
  const [bool, setBool] = useState(true);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTask((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    if (window.confirm("are you sure?")) {
      const updatedTask = task.filter((_, i) => i !== index);
      setTask(updatedTask);
    }
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index - 1]] = [
        updatedTask[index - 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
    }
  }

  function moveTaskDown(index) {
    if (index < task.length - 1) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index + 1]] = [
        updatedTask[index + 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
    }
  }
  return (
    <>
      <div className="to-do-list">
        <h1>TODO LIST</h1>
        {bool === true ? (
          <div className="task-option-header">
            <button className="btn-add" onClick={() => setBool(!bool)}>
              Add Task
            </button>
            <select name="select" id="select-task" className="select-task">
              <option value="All">All</option>
              {task.map((task, index) => (
                <option value="coba" key={index}>
                  {task}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="form">
            <input
              type="text"
              id="input"
              placeholder="Input New Task.."
              onChange={handleInputChange}
            />

            <button className="add-button" onClick={addTask}>
              Add
            </button>
          </div>
        )}
        <ol>
          {task.map((task, index) => (
            <li key={index}>
              <input type="checkbox" className="checkbox" />
              <span className="text">{task}</span>
              <div className="container-button">
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  <i class="fa-solid fa-trash"></i>
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
          ))}
        </ol>
      </div>
    </>
  );
}

export default ToDoList;
