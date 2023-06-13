import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// action definitions
const ADD_TODO =  'todo/ADD_TODO'
const DELETE_TODO = 'todo/REMOVE_TODO'
const CHECKED_TODO ='todo/CHECK_TODO'
const TOGGLE_COMPLETE = 'toggle/TOGGLE_COMPLETE'
const TOGGLE_ACTIVE = 'toggle/TOGGLE_ACTIVE'
const TOGGLE_CLEARFILTERS = 'toggle/TOGGLE_CLEARFILTERS'

//state
const initialState = {
    todos: [],
    completed: false,
    active: false
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
                return action.payload.id === item.id ? {...item, completed: !item.completed } : item
            })};
        case DELETE_TODO:
            return {...state, todos: state.todos.filter((item) => {
                return item.id !== action.payload.id ? item : null
            })};
        case TOGGLE_ACTIVE:
            return {...state, completed: false, active: true};
        case TOGGLE_COMPLETE:
            return {...state, completed: true, active: false};
        case TOGGLE_CLEARFILTERS:
                return {...state, active: false, completed: false};
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

        export function toggleComplete() {
            return {
                type: TOGGLE_COMPLETE
            }
        }

        export function toggleActive() {
            return {
                type: TOGGLE_ACTIVE
            }
        }

        export function toggleClear() {
            return {
                type: TOGGLE_CLEARFILTERS
            }
        }
        
        // hook
        export function useTodo() {
            const dispatch = useDispatch();
            const todosLi = useSelector((app) => app.todosState.todos);
            const active = useSelector((app) => app.todosState.active)
            const completed = useSelector((app) => app.todosState.completed)
            const setTodo = (item) => dispatch(addTodo(item))
            const setCompleteSatus = (item) => {dispatch(completeTodo(item))}
            const setRemoveItem = (item) => {dispatch(deleteTodo(item))}
            const setComplete = (item) => {dispatch(toggleComplete())}
            const setActive = (item) => {dispatch(toggleActive())}
            const setClearFilters = (item) => {dispatch(toggleClear())}
    return {
        todosLi,
        active,
        completed,
        setTodo,
        setCompleteSatus,
        setRemoveItem,
        setComplete,
        setActive,
        setClearFilters
    }
}


function generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }