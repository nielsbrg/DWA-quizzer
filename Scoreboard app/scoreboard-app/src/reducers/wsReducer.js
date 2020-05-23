const initialState = {
    conn: undefined,
    shouldConnect: false
};

export default function wsReducer(state=initialState, action) {
    switch(action.type) {
        case "WS_START": {
            return {...state, shouldConnect: state.conn === undefined}
        }
        case "WS_OPEN": {
            return {...state, shouldConnect: false}
        }
        case "STORE_WS_CONNECTION": {
            return {...state, conn: action.payload}
        }
        default: return state;
    }
}