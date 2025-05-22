import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SummaryButton from './components/SummaryButton';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (task) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, { task });
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const summarizeTodos = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/summarize`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: Failed to send summary to Slack');
      console.error('Error summarizing todos:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo Summary Assistant</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <SummaryButton summarizeTodos={summarizeTodos} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
