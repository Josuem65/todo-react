import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTodo } from '../hooks'


function InputTodos(props) {
  const { setTodo } = useTodo([])
  const [ currentValue, setCurrentValue ] = useState('')

  function handleSubmit(e) {
      e.preventDefault()
      setTodo(currentValue)
      setCurrentValue('')
    }

    return (
        <div className="inputArea">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input placeholder="What needs to be done?" 
            type="text" 
            onChange={(e) => setCurrentValue(e.target.value)}
            value={currentValue} className="userInput"/>
          </form>
        </div>
    )
}


function TodoList() {
  // const list = useSelector((state) => state.todosState.todos)
  const { todosLi, setCompleteSatus, setRemoveItem } = useTodo([])

  function handleChange(item) {
    setCompleteSatus(item.id)
  }

  function handleClick(item) {
    setRemoveItem(item.id)
  }

  console.log(todosLi)

    return (
          <ul className="ulDiv">
            {todosLi.map((item, index) => {
              console.log(item.text)
              return (    
                 <li key={item.id} className="eachItem">
                     <input type="checkbox" name={`todo/${index}`} onChange={() => handleChange(item)} className="checkboxInput"/>
                     <label htmlFor={`todo/${index}`} className={item.completed ? "completed" : ""}>{item.text}</label>
                     <button onClick={()=> handleClick(item)} className="deleteBtn">x</button>
                 </li>
              )
            })}
          </ul>
    )
} 

function Filters() {
  return (
    <div className="filters">
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  )
}

export function Todos() {
  const { todosLi } = useTodo([])
    return (
        <div className="main">
            <h1>todos</h1>
            <InputTodos/>
            {todosLi ? <TodoList/> : null}
            {todosLi.length > 1 ? <Filters/> : null}
        </div>
    )
}
