import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

interface Todo {
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;

   
  };

    
   /////color changes
   const [color, setColor] = useState("black")
   const click = (color:string)=>{
     setColor(color)
   }
   useEffect(() => {
     document.body.style.backgroundColor = color 
   }, [color])

  return (
    <div className="App">
    <div className='header'>
 <div className='colors'>
    <button onClick={
          () => click("gray")
        }>Gray</button>
        <button onClick={
          () => click("black")
        }>Reset</button>
        </div>
    <h1 className="TodoTitle">Todo List</h1>

    </div>
      
      <form onSubmit={addTodo}>
        <input
          className="TodoInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" className="TodoButton">Add</button>
      </form>
      <ul className="TodoList">
        {getFilteredTodos().map((todo, index) => (
          <li key={index} className={`TodoItem ${todo.completed ? 'completed' : ''}`}>
            <input
              type="radio"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <span>{todo.text}</span>
            <button onClick={() => toggleTodo(index)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
      <div className="FilterContainer">
        <button
          className={`FilterButton ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`FilterButton ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`FilterButton ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
      
    </div>
  );
};

export default TodoApp;
