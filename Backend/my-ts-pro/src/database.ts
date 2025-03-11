import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve(__dirname, 'data/users.json');

export interface User {
    username: string;
    password: string;
    balance: number;
}

function loadData(): User[] {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data) as User[];
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

function saveData(users: User[]): void {
    try {
        const data = JSON.stringify(users, null, 2);
        fs.writeFileSync(dataFilePath, data, 'utf-8');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

export function createUser(user: User): void {
    const users = loadData();
    users.push(user); // Append the new user to the existing array
    saveData(users);
}

export function getUserByUsername(username: string): User | undefined {
    const users = loadData();
    return users.find(user => user.username === username);
}

export function updateUserBalance(username: string, newBalance: number): void {
    const users = loadData();
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        users[userIndex].balance = newBalance;
        saveData(users);
    }
}
