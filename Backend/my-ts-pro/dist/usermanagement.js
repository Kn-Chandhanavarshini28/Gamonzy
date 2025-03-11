"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBalance = exports.getUserBalance = exports.loginUser = exports.registerUser = void 0;
const database_1 = require("./database");
function registerUser(username, password) {
    try {
        const user = { username, password, balance: 0 };
        (0, database_1.createUser)(user);
        console.log(`User ${username} registered successfully.`);
    }
    catch (error) {
        console.error('Error registering user:', error);
    }
}
exports.registerUser = registerUser;
function loginUser(username, password) {
    try {
        const user = (0, database_1.getUserByUsername)(username);
        if (user && user.password === password) {
            console.log(`User ${username} logged in successfully.`);
            return user;
        }
        else {
            console.log('Invalid username or password.');
            return null;
        }
    }
    catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}
exports.loginUser = loginUser;
function getUserBalance(username) {
    try {
        const user = (0, database_1.getUserByUsername)(username);
        if (user) {
            return user.balance;
        }
        else {
            console.log('User not found.');
            return null;
        }
    }
    catch (error) {
        console.error('Error retrieving user balance:', error);
        return null;
    }
}
exports.getUserBalance = getUserBalance;
function updateUserBalance(username, newBalance) {
    try {
        (0, database_1.updateUserBalance)(username, newBalance);
        console.log(`User balance updated successfully for ${username}.`);
    }
    catch (error) {
        console.error('Error updating user balance:', error);
    }
}
exports.updateUserBalance = updateUserBalance;
