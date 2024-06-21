import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'
import './App.css'

function TodoList () {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setTodos([...todos, inputValue])
    setInputValue('')
  }

  function handleDelete(index: number): void {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }


    //////for color change
    const [color, setColor] = useState("black")
  const click = (color:string)=>{
    setColor(color)
  }
  useEffect(() => {
    document.body.style.backgroundColor = color 
  }, [color])


  return (
  



    <div>
        

      <div className='top-bar'>
      <div className='App' style={{ margin:"20px"}}>
        <button onClick={
          () => click("gray")
        }>Gray</button>
        <button onClick={
          () => click("black")
        }>Reset</button>
      </div>
        <img src='./bg-desktop-dark.jpg'/>
      
      <h1>Todo List</h1>
      </div>
      <div className='holder'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter your Todo here' value={inputValue} onChange={handleChange}/>
        <button type="submit">Add Todo</button>
      </form>
      <ul >
        {todos.map((todo, index) => (
          <li key={index}>{todo}
            <button onClick={() => handleDelete(index)} style={{color:'red'}}>Delete</button>
           
          </li>
          
        ))}
      </ul>
      
      </div>
    </div>
  )
}

export default TodoList;