"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const usermanagement_1 = require("./usermanagement");
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function clearTerminal() {
    process.stdout.write('\x1Bc');
}
function moveCursor(x, y) {
    readline_1.default.cursorTo(process.stdout, x, y);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function printStar() {
    const star = '💫';
    const x = getRandomInt(0, process.stdout.columns - 1);
    const y = getRandomInt(0, process.stdout.rows - 1);
    moveCursor(x, y);
    process.stdout.write(star);
}
function star(duration) {
    clearTerminal();
    const interval = setInterval(() => {
        clearTerminal();
        printStar();
    }, 150);
    setTimeout(() => {
        clearInterval(interval);
        clearTerminal();
        console.log('Congratulations! 🌟');
    }, duration);
}
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
let currentBalance = 0;
let spinCount = 0;
let currentUser = null;
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}
function generateMatrix() {
    const matrix = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(getRandomSymbol());
        }
        matrix.push(row);
    }
    return matrix;
}
function displayMatrix(matrix, bets) {
    console.log(`Bets: Row 1 - $${bets[0]}, Row 2 - $${bets[1]}, Row 3 - $${bets[2]}`);
    for (const row of matrix) {
        console.log(`| ${row.join(' | ')} |`);
    }
}
function checkRowWin(matrix) {
    const rowWins = [false, false, false];
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
            rowWins[i] = true;
        }
    }
    return rowWins;
}
function isPrime(num) {
    if (num <= 1)
        return false;
    if (num <= 3)
        return true;
    if (num % 2 === 0 || num % 3 === 0)
        return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0)
            return false;
    }
    return true;
}
function calculateWinnings(bets, rowWins) {
    let winnings = 0;
    let rowsWon = rowWins.filter(win => win).length;
    if (rowsWon >= 2 && bets.filter(bet => bet > 0).length === 2) {
        winnings += 20; // Bonus for winning on 2 rows when betting on 2 rows
        console.log('\x1b[33mCongratulations! 🌟 You got a $20 bonus!\x1b[0m');
    }
    if (rowsWon === 3 && bets.filter(bet => bet > 0).length === 3) {
        winnings += 50; // Bonus for winning on all 3 rows when betting on all 3 rows
        console.log('\x1b[33mCongratulations! 🌟 You got a $50 bonus!\x1b[0m');
    }
    for (let i = 0; i < 3; i++) {
        if (rowWins[i]) {
            winnings += bets[i];
        }
    }
    return winnings;
}
function spin(bets) {
    spinCount++;
    const matrix = generateMatrix();
    if (bets.filter(bet => bet > 0).length === 1 && isPrime(spinCount)) {
        const rowIndex = bets.findIndex(bet => bet > 0);
        matrix[rowIndex] = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()].map(symbol => symbol = symbols[0]);
    }
    else if (bets.filter(bet => bet > 0).length === 2 && spinCount % 2 === 0) {
        for (let i = 0; i < 3; i++) {
            matrix[i] = [symbols[0], symbols[0], symbols[0]];
        }
    }
    else if (bets.filter(bet => bet > 0).length === 3 && spinCount % 3 === 0) {
        for (let i = 0; i < 3; i++) {
            matrix[i] = [symbols[0], symbols[0], symbols[0]];
        }
    }
    displayMatrix(matrix, bets);
    const rowWins = checkRowWin(matrix);
    const winnings = calculateWinnings(bets, rowWins);
    console.log('Row wins:', rowWins);
    console.log('Total winnings: $' + winnings);
    currentBalance += winnings;
    (0, usermanagement_1.updateUserBalance)(currentUser, currentBalance); // Update the user's balance in storage
    console.log(`Current Balance: $${currentBalance}`);
    if (winnings > 0) {
        star(3000); // Start the star shower effect for 3 seconds (3000 milliseconds)
        console.log('\x1b[36mCongratulations! You won! 🌟\x1b[0m');
    }
    askForNextAction();
}
function askForNextAction() {
    rl.question('Do you want to spin again? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            askForBets();
        }
        else {
            console.log('Thanks for playing!');
            currentBalance = 0;
            rl.close();
        }
    });
}
function askForBets() {
    rl.question('How many rows do you want to bet on? (1, 2, or 3): ', (rowsAnswer) => {
        const rows = parseInt(rowsAnswer);
        if ([1, 2, 3].includes(rows)) {
            rl.question(`Enter your bet amounts for the ${rows} rows (comma-separated): `, (input) => {
                const bets = input.split(',').map(Number);
                if (bets.length === rows && bets.every(bet => !isNaN(bet) && bet > 0)) {
                    const totalBet = bets.reduce((a, b) => a + b, 0);
                    if (totalBet <= currentBalance) {
                        currentBalance -= totalBet;
                        console.log(`Total Bet: $${totalBet}`);
                        console.log(`Remaining Balance: $${currentBalance}`);
                        const completeBets = [0, 0, 0];
                        for (let i = 0; i < rows; i++) {
                            completeBets[i] = bets[i];
                        }
                        spin(completeBets);
                    }
                    else {
                        console.log('Insufficient balance. Please enter valid bet amounts.');
                        askForBetAmounts(rows);
                    }
                }
                else {
                    console.log('Invalid input. Please enter valid bet amounts.');
                    askForBetAmounts(rows);
                }
            });
        }
        else {
            console.log('Invalid input. Please enter 1, 2, or 3.');
            askForBets();
        }
    });
}
function askForBetAmounts(rows) {
    rl.question(`Enter your bet amounts for the ${rows} rows (comma-separated): `, (input) => {
        const bets = input.split(',').map(Number);
        if (bets.length === rows && bets.every(bet => !isNaN(bet) && bet > 0)) {
            const totalBet = bets.reduce((a, b) => a + b, 0);
            if (totalBet <= currentBalance) {
                currentBalance -= totalBet;
                console.log(`Total Bet: $${totalBet}`);
                console.log(`Remaining Balance: $${currentBalance}`);
                const completeBets = [0, 0, 0];
                for (let i = 0; i < rows; i++) {
                    completeBets[i] = bets[i];
                }
                spin(completeBets);
            }
            else {
                console.log('Insufficient balance. Please enter valid bet amounts.');
                askForBetAmounts(rows);
            }
        }
        else {
            console.log('Invalid input. Please enter valid bet amounts.');
            askForBetAmounts(rows);
        }
    });
}
function amountDeposit() {
    rl.question('How much amount do you want to deposit: ', (answer) => {
        const depositAmount = parseFloat(answer);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            console.log('Enter a positive number as an amount');
            amountDeposit();
        }
        else {
            currentBalance += depositAmount;
            (0, usermanagement_1.updateUserBalance)(currentUser, currentBalance); // Update the user's balance in storage
            console.log(`Total Balance: $${currentBalance}`);
            askForBets();
        }
    });
}
function askForName() {
    console.log('Welcome to Gamonzy!');
    login();
}
function login() {
    rl.question('Enter your username: ', (username) => {
        rl.question('Enter your password: ', (password) => {
            const user = (0, usermanagement_1.loginUser)(username, password); // Authenticating user
            if (user) {
                currentUser = username;
                console.log(`Welcome, ${currentUser}! Let's continue.`);
                const userBalance = (0, usermanagement_1.getUserBalance)(username); // Fetching user balance
                if (userBalance !== null) {
                    currentBalance = userBalance; // Setting current balance
                    askForBets();
                }
            }
            else {
                console.log('Invalid username or password. Please try again.');
                login();
            }
        });
    });
}
function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name.trim());
}
function startApplication() {
    console.log('Welcome to Gamonzy! You get a bonus amount if you win more than 2 spins at a time!');
    rl.question('Are you a new user? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            rl.question('Enter username: ', (username) => {
                rl.question('Enter password: ', (password) => {
                    (0, usermanagement_1.registerUser)(username, password);
                    startGame(username);
                });
            });
        }
        else {
            askForName();
        }
    });
}
function startGame(username) {
    currentUser = username;
    console.log(`Welcome, ${currentUser}!`);
    amountDeposit();
}
startApplication();
