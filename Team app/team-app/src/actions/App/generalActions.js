export default function changeAppTitle(newTitle) {
    return {
        type: "CHANGE_TITLE",
        payload: newTitle
    }
}