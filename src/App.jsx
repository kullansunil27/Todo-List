import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setTodos([...todos, {
      id: Date.now(),
      title: title,
      description: description,
      completed: false
    }])
    setTitle('')
    setDescription('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Sunil Todo Project</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="todo-input-container">
        <div className="input-group">
          <input
            type="text"
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
          />
          <textarea
            className="todo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description..."
          />
        </div>
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <div 
              className={`checkbox-wrapper ${todo.completed ? 'checked' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.completed && (
                <svg 
                  className="checkmark" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              )}
            </div>
            <div className="todo-content">
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && (
                <p className="todo-description-text">{todo.description}</p>
              )}
            </div>
            <button
              className="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App