import React, { useState } from 'react';
import './ChildToDo.css';

export default function ChildToDo({ parentIndex, task, setTask, childData }) {
  const [childInput, setChildInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleChildInputChange = (value) => {
    setChildInput(value);
  };

  const handleAddOrUpdateChildTask = () => {
    if (!childInput) {
      alert("Enter your sub task")
    }
    else{
      const updatedTasks = [...task];
      if (editIndex !== null) {
        // Update existing child task
        updatedTasks[parentIndex].child[editIndex] = childInput;
        setEditIndex(null); // Reset edit mode
      } else {
        // Add new child task
        updatedTasks[parentIndex].child.push(childInput);
      }
  
      setTask(updatedTasks);
      setChildInput("");
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = [...task];
    updatedTasks[parentIndex].child.splice(index, 1);
    setTask(updatedTasks);
  };

  const handleEdit = (index) => {
    setChildInput(childData[index]);
    setEditIndex(index);
  };

  return (
    <section className='child-container'>
      <div className='child-input'>
        <input
          type="text"
          className="child-todo-input"
          placeholder="Add your child task"
          value={childInput}
          onChange={(event) => handleChildInputChange(event.target.value)}
        />
        <button className='child-add' onClick={handleAddOrUpdateChildTask}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <div className='child-list'>
      <ul>
        {childData.map((childTask, index) => (
          <li key={index}>
            <div className='child-list'>
              <div className='child-list-data'>
                <p >{childTask}</p>
              </div>
            <div className='btns'>
              <button type='button' className='child-edit' onClick={() => handleEdit(index)}>Edit</button>
              <button type='button' className='child-delete'onClick={() => handleDelete(index)}>Delete</button>
            </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
