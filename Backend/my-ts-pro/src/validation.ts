// Function to validate the username
export function validateUsername(username: string): boolean {
    // Username must be at least 5 characters long and contain at least one number
    const usernameRegex = /^(?=.*\d)[a-zA-Z\d]{5,}$/;
    return usernameRegex.test(username);
}

// Function to validate the password
export function validatePassword(password: string): boolean {
    // Password must be at least 8 characters long and contain at least one symbol
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
}
