import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './MyToDo.css'

const todosKey = "reactTodo"
export default function MyToDo() {
  const [task, setTask] = useState(() =>
  {
    const rawTodos = localStorage.getItem(todosKey)
    if(!rawTodos) return []
    return JSON.parse(rawTodos)

  });
  const [inputValue, setInputValue] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [editIndex, setEditIndex] = useState(null); //index for editing

  // add data to local storage 
  localStorage.setItem("reactTodo", JSON.stringify(task))
  
 // handle input change
  const handleInputchange = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return;
    
    // If editing, update the task at the specified index
    if (editIndex !== null) {
      const updatedTasks = [...task];
      updatedTasks[editIndex] = inputValue;
      setTask(updatedTasks);
      setEditIndex(null); // Reset after editing
    } else {
      if (task.includes(inputValue)) return;
      setTask((prevTask) => [...prevTask, inputValue]);
    }

    setInputValue(""); // Clear input after adding/updating
  };

  // Edit event: Set task to edit and pre-fill input field
  const handleEdit = (index) => {
    setInputValue(task[index]);
    setEditIndex(index);
  };

  // Delete event: Remove task
  const handleDelete = (value) => {
    const updatedTask = task.filter((curElem) => curElem !== value);
    setTask(updatedTask);
  };


  // Clear All 
  const handleClearAll = () => {
    setTask([]);
  };

  // Display date and time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>
      <section className="todo-form">
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              className="todo-input"
              value={inputValue}
              autoComplete="off"
              onChange={(event) => handleInputchange(event.target.value)}
            />
          </div>
          <div>
            <button className="todo-btn">
              {editIndex !== null ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </section>
      <section>
        <ul>
          {task.map((curnTask, index) => (
            <li key={index} className="todo-item">
              <span>{curnTask}</span>
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(curnTask)}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
        <section>
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All
          </button>
        </section>
      </section>
    </section>
  );
}
