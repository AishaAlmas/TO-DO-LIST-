import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (isEditing && index === currentIndex) {
      setIsEditing(false);
      setTask('');
      setCurrentIndex(null);
    }
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleUpdateTask = () => {
    if (task.trim() !== '') {
      const updatedTasks = tasks.map((t, i) =>
        i === currentIndex ? task : t
      );
      setTasks(updatedTasks);
      setTask('');
      setIsEditing(false);
      setCurrentIndex(null);
    }
  };

  return (
    <div className="App">
      <h1>Aisha To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
      />
      {isEditing ? (
        <button onClick={handleUpdateTask}>Update</button>
      ) : (
        <button onClick={handleAddTask}>Add</button>
      )}

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <div>
              <button
                onClick={() => handleEditTask(index)}
                style={{ marginRight: '5px', backgroundColor: '#ffc107' }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
