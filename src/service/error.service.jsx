const errorMessages = {
    400: 'Invalid request. Please check your input.',
    401: 'Invalid email or password.',
    403: 'You are not authorized to access this application.',
    404: 'Account not found.',
    422: 'Validation failed. Please check your details.',
    500: 'Server error. Please try again later.',
};

export const handleApiError = (error) => {
    if (error.response) {
        return errorMessages[error.response.status] || 'Something went wrong. Please try again.';
    }

    if (error.request) {
        return 'Network error. Please check your internet connection.';
    }

    return 'Unexpected error occurred.';
};
