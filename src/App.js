import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-l from-white via-purple-300 to-purple-400 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">To-Do List</h1>

      <div className="bg-white shadow-md rounded-lg w-96 p-4">
        {/* Task Input */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow border rounded-l-lg px-3 py-2 text-gray-700"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        <ul>
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 mb-2 rounded-lg ${
                task.completed ? 'bg-green-100' : 'bg-gray-200'
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-2"
              />
              {/* Editable Task Text */}
              <input
                type="text"
                value={task.text}
                onChange={(e) => editTask(task.id, e.target.value)}
                className={`flex-grow border-none bg-transparent focus:ring-0 ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              />
              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
