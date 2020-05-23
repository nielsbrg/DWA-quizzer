const initialState = {
    conn: undefined,
    wsConnectionErrMsg: "",
    wsConnectionSuccessMsg: ""
};
export default function webSocketReducer(state=initialState, action) {
    switch(action.type) {
        case "ESTABLISH_WS": {
            return {...state, conn: action.payload}
        }
        case "WS_CONNECTION_FAILURE": {
            return {...state, wsConnectionErrMsg: action.payload }
        }
        case "WS_CONNECTION_SUCCESS": {
            return {...state, wsConnectionSuccessMsg: action.payload, wsConnectionErrMsg: ""}
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;

        default: return state;
    }
}