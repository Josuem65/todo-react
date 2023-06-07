import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './ducks/'

const rootReducer = combineReducers(reducers)
const enhancer = compose(applyMiddleware(thunk))
export const store = createStore(rootReducer, enhancer)