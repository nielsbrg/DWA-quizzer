import {combineReducers} from 'redux'
import homeScreenReducer from './homeReducer'
import appTitleReducer from './appTitleReducer'
import wsReducer from './wsReducer'
import waitingReducer from './waitingReducer'
import quizReducer from './quizReducer'

export default combineReducers({
    appTitle: appTitleReducer,
    ws: wsReducer,
    home: homeScreenReducer,
    waiting: waitingReducer,
    quiz: quizReducer
});