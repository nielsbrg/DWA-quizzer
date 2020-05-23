export default function changeSearchTerm(isParticipants, value) {
    return {
        type: "CHANGE_SEARCH_TERM",
        payload: {
            value: value,
            isParticipants: isParticipants
        }
    }
}