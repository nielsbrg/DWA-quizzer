import {combineReducers} from 'redux'
import homeScreenReducer from './homeReducer'
import appTitle from './appTitleReducer'
import lobbyReducer from './lobbyReducer'
import quizReducer from './quizReducer'
import webSocketReducer from './webSocketReducer'
import roundReducer from './roundReducer'
import {startRoundReducer} from './startRoundReducer'
import categoryReducer from './categoryReducer'
import questionReducer from './questionReducer'
import selectQuestionReducer from "./selectQuestionReducer";
import waitingReducer from "./waitingReducer";
import answerReducer from "./answerReducer";
import endQuizReducer from './endQuizReducer'
import quizSettingsReducer from "./quizSettingsReducer";
import teamReducer from "./teamReducer";

export default combineReducers({
    home: homeScreenReducer,
    appTitle: appTitle,
    lobby: lobbyReducer,
    quiz: quizReducer,
    ws: webSocketReducer,
    roundNumber: roundReducer,
    questionNumber: questionReducer,
    startRound: startRoundReducer,
    categories: categoryReducer,
    selectQuestion: selectQuestionReducer,
    waiting: waitingReducer,
    answers: answerReducer,
    endQuiz: endQuizReducer,
    quizSettings: quizSettingsReducer,
    teams: teamReducer
});