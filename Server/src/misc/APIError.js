module.exports = APIError = (status, statusText, message) => {
    return {
        status: status,
        statusText: statusText,
        message: message
    }
};