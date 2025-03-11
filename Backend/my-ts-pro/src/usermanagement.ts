import { createUser as dbCreateUser, getUserByUsername as dbGetUserByUsername, updateUserBalance as dbUpdateUserBalance, User } from './database';

export function registerUser(username: string, password: string): void {
    try {
        const user: User = { username, password, balance: 0 };
        dbCreateUser(user);
        console.log(`User ${username} registered successfully.`);
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export function loginUser(username: string, password: string): User | null {
    try {
        const user = dbGetUserByUsername(username);
        if (user && user.password === password) {
            console.log(`User ${username} logged in successfully.`);
            return user;
        } else {
            console.log('Invalid username or password.');
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export function getUserBalance(username: string): number | null {
    try {
        const user = dbGetUserByUsername(username);
        if (user) {
            return user.balance;
        } else {
            console.log('User not found.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user balance:', error);
        return null;
    }
}

export function updateUserBalance(username: string, newBalance: number): void {
    try {
        dbUpdateUserBalance(username, newBalance);
        console.log(`User balance updated successfully for ${username}.`);
    } catch (error) {
        console.error('Error updating user balance:', error);
    }
}
