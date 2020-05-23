const initialState = {
    conn: undefined,
    connErrMsg: "",
    connCloseMsg: "",
    isConnected: false
};

export default function wsReducer(state=initialState, action) {
    switch(action.type) {
        case "STORE_WS": {
            return {...state, conn: action.payload}
        }
        case "WS_CLOSE": {
            return {...state, conn: undefined, connCloseMsg: action.payload, isConnected: false}
        }
        case "WS_ERROR": {
            return {...state, conn: undefined, connErrMsg: action.payload, isConnected: false}
        }
        case "WS_OPEN": {
            return {...state, connSuccessMsg: action.payload, isConnected: true}
        }
        case "CLEAR_ERRORS": {
            return {...state, connErrMsg: "", connCloseMsg: ""}
        }
        case "WS_START": {
            return initialState;
        }
        default: return state;
    }
}