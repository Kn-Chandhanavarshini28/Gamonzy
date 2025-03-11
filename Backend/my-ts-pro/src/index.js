"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var currentBalance = 0;
var spinCount = 0;
function getRandomSymbol() {
    var randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}
function generateMatrix() {
    var matrix = [];
    for (var i = 0; i < 3; i++) {
        var row = [];
        for (var j = 0; j < 3; j++) {
            row.push(getRandomSymbol());
        }
        matrix.push(row);
    }
    return matrix;
}
function displayMatrix(matrix, bets) {
    console.log('Bets: Row 1 - $${bets[0]}, Row 2 - $${bets[1]}, Row 3 - $${bets[2]}');
    for (var _i = 0, matrix_1 = matrix; _i < matrix_1.length; _i++) {
        var row = matrix_1[_i];
        console.log("| ".concat(row.join(' | '), " |"));
    }
}
function checkRowWin(matrix) {
    var rowWins = [false, false, false];
    for (var i = 0; i < 3; i++) {
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
    for (var i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0)
            return false;
    }
    return true;
}
function calculateWinnings(bets, rowWins) {
    var winnings = 0;
    var rowsWon = rowWins.filter(function (win) { return win; }).length;
    if (rowsWon >= 2 && bets.filter(function (bet) { return bet > 0; }).length === 2) {
        winnings += 20; // Bonus for winning on 2 rows when betting on 2 rows
        console.log('\x1b[33mCongratulations! You got a $20 bonus!\x1b[0m');
    }
    if (rowsWon === 3 && bets.filter(function (bet) { return bet > 0; }).length === 3) {
        winnings += 50; // Bonus for winning on all 3 rows when betting on all 3 rows
        console.log('\x1b[33mCongratulations! You got a $50 bonus!\x1b[0m');
    }
    for (var i = 0; i < 3; i++) {
        if (rowWins[i]) {
            winnings += bets[i];
        }
    }
    return winnings;
}
function spin(bets) {
    spinCount++;
    var matrix = generateMatrix();
    //  wins based on specific conditions
    if (bets.filter(function (bet) { return bet > 0; }).length === 1 && isPrime(spinCount)) {
        var rowIndex = bets.findIndex(function (bet) { return bet > 0; });
        matrix[rowIndex] = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()].map(function (symbol) { return symbol = symbols[0]; });
    }
    else if (bets.filter(function (bet) { return bet > 0; }).length === 2 && spinCount % 2 === 0) {
        for (var i = 0; i < 3; i++) {
            matrix[i] = [symbols[0], symbols[0], symbols[0]];
        }
    }
    else if (bets.filter(function (bet) { return bet > 0; }).length === 3 && spinCount % 3 === 0) {
        for (var i = 0; i < 3; i++) {
            matrix[i] = [symbols[0], symbols[0], symbols[0]];
        }
    }
    displayMatrix(matrix, bets);
    var rowWins = checkRowWin(matrix);
    var winnings = calculateWinnings(bets, rowWins);
    console.log('Row wins:', rowWins);
    console.log('Total winnings: $' + winnings);
    currentBalance += winnings;
    console.log('Current Balance: $${currentBalance}');
    // Showers when the user wins
    if (winnings > 0) {
        console.log('\x1b[36mCongratulations! You won! 🎉🎉🎉\x1b[0m');
    }
    askForNextAction();
}
// Other functions remain the same...
function askForNextAction() {
    rl.question('Do you want to spin again? (yes/no): ', function (answer) {
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
    rl.question('How many rows do you want to bet on? (1, 2, or 3): ', function (rowsAnswer) {
        var rows = parseInt(rowsAnswer);
        if ([1, 2, 3].includes(rows)) {
            rl.question("Enter your bet amounts for the ".concat(rows, " rows (comma-separated): "), function (input) {
                var bets = input.split(',').map(Number);
                if (bets.length === rows && bets.every(function (bet) { return !isNaN(bet) && bet > 0; })) {
                    var totalBet = bets.reduce(function (a, b) { return a + b; }, 0);
                    if (totalBet <= currentBalance) {
                        currentBalance -= totalBet;
                        console.log('Total Bet: $${totalBet}');
                        console.log('Remaining Balance: $${currentBalance}');
                        var completeBets = [0, 0, 0];
                        for (var i = 0; i < rows; i++) {
                            completeBets[i] = bets[i];
                        }
                        spin(completeBets);
                    }
                    else {
                        console.log('Insufficient balance. Please enter valid bet amounts.');
                        askForBets();
                    }
                }
                else {
                    console.log('Invalid input. Please enter valid bet amounts.');
                    askForBets();
                }
            });
        }
        else {
            console.log('Invalid input. Please enter 1, 2, or 3.');
            askForBets();
        }
    });
}
function amountDeposit() {
    rl.question('How much amount do you want to deposit: ', function (answer) {
        var depositAmount = parseFloat(answer);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            console.log('Enter a positive number as an amount');
            amountDeposit();
        }
        else {
            currentBalance += depositAmount;
            console.log('Total Balance: $${currentBalance}');
            askForBets();
        }
    });
}
function askForName() {
    rl.question('Welcome to Gamonzy! You get a bonus amount if you win more than 2 spins at a time!\nEnter your Name: ', function (name) {
        if (validateName(name)) {
            console.log("Hello ".concat(name, "! Let us begin.."));
            amountDeposit();
        }
        else {
            console.log('Invalid name. Please enter a valid name.');
            askForName();
        }
    });
}
function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name.trim());
}
askForName();
