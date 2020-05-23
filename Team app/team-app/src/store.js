import allReducers from './reducers'
import { applyMiddleware, createStore } from 'redux'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

const middleware = applyMiddleware(promise(), logger);

const composeEnhancers = composeWithDevTools({});
export default createStore(allReducers, composeEnhancers(middleware));