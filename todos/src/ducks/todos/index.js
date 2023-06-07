import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// action definitions
const ADD_TODO =  'todo/ADD_TODO'
const DELETE_TODO = 'todo/REMOVE_TODO'
const CHECKED_TODO ='todo/CHECK_TODO'


//state
const initialState = {
    todos: [],
}
 
function generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

//reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO:
            return {...state, 
                todos: [...state.todos, {id: generateId(), text: action.payload, completed: false}]
            };
        case CHECKED_TODO: 
            return {...state, todos: state.todos.map((item) => {
                return action.payload === item.id ? {...item, completed: !item.completed } : item
            }) }
        case DELETE_TODO:
            return {...state, todos: state.todos.filter((item) => {
                //filter out the selected id from the array
                return item.id !== action.payload ? item : null
            })};
        default:
            return {...state}
    }
}

//action creators
export function addTodo(item) {
    return {
        type: ADD_TODO,
        payload: item,
    }
}

export function completeTodo(item) {
    return {
        type: CHECKED_TODO,
        payload: item,
    }
}

export function deleteTodo(item) {
    return {
        type: DELETE_TODO,
        payload: item,
    }
}

// hook
export function useTodo() {
    const dispatch = useDispatch();
    const todosLi = useSelector((app) => app.todosState.todos);
    const setTodo = (item) => dispatch(addTodo(item));
    const setCompleteSatus = (item) => {dispatch(completeTodo(item))}
    const setRemoveItem = (item) => {dispatch(deleteTodo(item))}
    return {
        todosLi,
        setTodo,
        setCompleteSatus,
        setRemoveItem
    }
}
