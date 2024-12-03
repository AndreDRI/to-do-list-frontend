import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Interceptor para configurar o token JWT
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  // API URL (Change this if your backend URL is different)
  const API_URL = 'http://localhost:3306/tasks';

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post(API_URL, { title: newTask });
        console.log(response.data)
        setTasks([...tasks, response.data]); // Update the task list with the new task
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      // Certifique-se de que a URL está correta
      const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      console.log('Task updated:', response.data);
      fetchTasks(); // Atualiza a lista de tarefas após a alteração
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };
  

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id, newText) => {
    try {
      // Certifique-se de que a URL está correta e os dados enviados têm o nome esperado pelo backend
      const response = await axios.put(`${API_URL}/${id}`, { title: newText });
      console.log('Task updated:', response.data);
      fetchTasks(); // Atualiza a lista de tarefas após a alteração
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
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
        {filteredTasks.map((task) => (
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
                onChange={() => toggleTaskCompletion(task.id, task.completed)}
                className="mr-2"
              />
              {/* Editable Task Text */}
              <input
                type="text"
                value={task.title} // Atualizado para `task.title`
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
