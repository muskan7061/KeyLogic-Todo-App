import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './MyToDo.css'
import ChildToDo from "./ChildToDo";

const todosKey = "reactTodo";

export default function MyToDo() {
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [task, setTask] = useState(() => {
    const rawTodos = localStorage.getItem(todosKey);
    if (!rawTodos) return [];
    return JSON.parse(rawTodos);
  });

  console.log(task, 'task')
  
    // Add data to local storage
    useEffect(() => {
      localStorage.setItem(todosKey, JSON.stringify(task));
    }, [task]);

  //Display date and time
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();
        setDateTime(`${formattedDate} - ${formattedTime}`);
      }, 1000);
      return () => clearInterval(interval);
    }, [])

  const handleInputchange = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) {
      alert("Enter your task")
    }

    if (editIndex !== null) {
      const updatedTasks = [...task];
      updatedTasks[editIndex].name = inputValue;
      setTask(updatedTasks);
      setEditIndex(null);
    } else {
      const findData = task.find((x) => x.name === inputValue);
      if (findData) return;
      setTask((prevTask) => [...prevTask, { name: inputValue, child: [] }]);
    }

    setInputValue("");
  };

  const handleEdit = (index) => {
    setInputValue(task[index].name);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    // const updatedTask = task.filter((curElem, i) => i !== index);
    const updatedTask = [...task];
    updatedTask.splice(index, 1);
    setTask([...updatedTask]);
  };

  const handleClearAll = () => {
    setTask([]);
  };

  return (
    <section className="todo-container">
      <header>
        <h1>Welcome to Todo List</h1>
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
          <hr />
        </form>
      </section>
      <section>
        <ul>
          {task.map((curnTask, index) => (
            <>
            <li key={index} className="todo-item">
            <div/>
              <span>{curnTask.name}</span>
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}>
                <MdDelete />
              </button>
              <div/>
              <hr />
            </li>
            <ChildToDo
                parentIndex={index}
                task={task}
                setTask={setTask}
                childData={curnTask.child}
              />
            </>
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
