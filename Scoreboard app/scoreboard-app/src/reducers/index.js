import {combineReducers} from 'redux'
import wsReducer from './wsReducer'
import homeReducer from "./homeReducer";
import quizReducer from "./quizReducer";
import scoreboardReducer from "./scoreboardReducer";
import {quizEndReducer} from "./quizEndReducer";

export default combineReducers({
    home: homeReducer,
    ws: wsReducer,
    quiz: quizReducer,
    scoreboard: scoreboardReducer,
    quizEnd: quizEndReducer
});