export default function storeWsConnection(connection) {
    return {
        type: "ESTABLISH_WS",
        payload: connection
    }
}