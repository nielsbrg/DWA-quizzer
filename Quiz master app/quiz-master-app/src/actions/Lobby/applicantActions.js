import request from 'superagent'

export function addApplicant(applicant) {
    return {
        type: "ADD_APPLICANT",
        payload: applicant
    }
}

export function acceptApplicant(participant) {
    return {
        type: "ACCEPT_APPLICANT",
        payload: participant
    }
}

export function refuseApplicant(name) {
    return {
        type: "REFUSE_APPLICANT",
        payload: name
    }
}

export function acceptAll(names) {
    return {
        type: "ACCEPT_ALL_APPLICANTS",
        payload: names.map(name => {
            return {
                name: name,
                isReady: false
            }
        })
    }
}

export function refuseAll() {
    return {
        type: "REFUSE_ALL_APPLICANTS",
    }
}

export function applicantCancel(name) {
    return {
        type: "APPLICANT_CANCEL",
        payload: name
    }
}