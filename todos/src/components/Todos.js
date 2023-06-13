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
  const { todosLi, active, completed, setCompleteSatus, setRemoveItem } = useTodo([])
  let filter = []
  function handleChange(item) {
    setCompleteSatus(item)
  }

  function handleClick(item) {
    setRemoveItem(item)
  }

  if(active) {
    filter = todosLi.filter((item) => {
      return item.completed ? null : item
    })
  }else if(completed) {
    filter = todosLi.filter((item) => {
      return item.completed ? item : null
    })
  } else {
    filter = todosLi
  }
    return (
          <ul className="ulDiv">
            {filter.map((item, index) => {
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
const { active, completed, setActive, setComplete, setClearFilters } = useTodo([])

  return (
    <div className="filters">
      <button className={!active && !completed ? "filterBtn toggledBtn" : "filterBtn"} onClick={setClearFilters}>All</button>
      <button className={active ? "filterBtn toggledBtn" : "filterBtn"} onClick={setActive}>Active</button>
      <button className={completed ? "filterBtn toggledBtn" : "filterBtn"} onClick={setComplete}>Completed</button>  
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
