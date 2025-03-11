"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBalance = exports.getUserByUsername = exports.createUser = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.resolve(__dirname, 'data/users.json');
function loadData() {
    try {
        const data = fs_1.default.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}
function saveData(users) {
    try {
        const data = JSON.stringify(users, null, 2);
        fs_1.default.writeFileSync(dataFilePath, data, 'utf-8');
    }
    catch (error) {
        console.error('Error saving data:', error);
    }
}
function createUser(user) {
    const users = loadData();
    users.push(user); // Append the new user to the existing array
    saveData(users);
}
exports.createUser = createUser;
function getUserByUsername(username) {
    const users = loadData();
    return users.find(user => user.username === username);
}
exports.getUserByUsername = getUserByUsername;
function updateUserBalance(username, newBalance) {
    const users = loadData();
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        users[userIndex].balance = newBalance;
        saveData(users);
    }
}
exports.updateUserBalance = updateUserBalance;
