import allReducers from './reducers'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

const middleware = applyMiddleware(promise(), logger);

export default createStore(allReducers, middleware);