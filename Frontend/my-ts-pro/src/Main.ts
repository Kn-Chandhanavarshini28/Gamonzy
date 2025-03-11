import { Account } from "./acc";
import { Game } from "./game";
let acc = new Account();
let game = new Game();
interface GameOutput {
    matrix: string[][],
    winnings: number
}
let username = "none"
document.addEventListener("DOMContentLoaded", () => {
    const bodyId = document.body.id;
    const spinButton = document.getElementById('submitbutton') as HTMLButtonElement;
    const usernameElement = document.getElementById('login-username') as HTMLInputElement;
    const passwordElement = document.getElementById('login-password') as HTMLInputElement;
    const usernameElement1 = document.getElementById('signup-username') as HTMLInputElement;
    const passwordElement1 = document.getElementById('signup-password') as HTMLInputElement;
    const signinButton = document.getElementById('LogIn') as HTMLButtonElement;
    const signupButton = document.getElementById('Sign-up') as HTMLButtonElement;
    const bankbalanceElement = document.getElementById('bankbalance') as HTMLElement;
    const bankElement = document.getElementById('bank') as HTMLInputElement;
    const betElement = document.getElementById('bet-amount') as HTMLInputElement;
    const betRowsElement = document.getElementById('bet-rows') as HTMLInputElement;
    const BankAddButton = document.getElementById('bankadd') as HTMLButtonElement;
    const slotResultsElement = document.getElementById('slot') as HTMLElement;
    const statusElement = document.getElementById('status') as HTMLElement;

    if (bodyId === "home") {
        const storedusername = localStorage.getItem('username');
        if (storedusername) {
            username = storedusername;
        }
        acc.account("getBankBalance", username).then(response => {
            let bankbal = response;
            console.log(response)
            bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
        });
        BankAddButton.addEventListener('click', () => {
            let bank: number = parseFloat(bankElement.value);
            if (username == "none") {
                alert("sign in or sign up to start the game!")
            }
            else {
                if (bank < 10000000000) {
                    acc.account("BankAddWid", username, bank);
                }
                if (bank >= 10000000000) {
                    alert("Amount too high!");
                }
                setTimeout(() => {
                    acc.account("getBankBalance", username).then(response => {
                        let bankbal;
                        bankbal = response;
                        bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                    });
                }, 100);
            }
        });
        spinButton.addEventListener('click', () => {
            const betvalue = parseFloat(betElement.value);
            const betrows = parseFloat(betRowsElement.value);
            const bet: number[] = Array(betrows).fill(betvalue);
            let bankbal;
            acc.account("getBankBalance", username).then(response => {
                console.log(response)
                bankbal = response;
                if (bet > bankbal) {
                    alert("Not enough balance!");
                    return;
                }
                if (bankbal < 10) {
                    alert("At least $10 should be deposited to play the game");
                    return;
                } else {
                    game.play(bet).then((res) => {
                        let beoutput = res as GameOutput
                        let slot = beoutput.matrix;
                        let output = beoutput.winnings;
                        console.log(slot);
                        slotResultsElement.innerHTML = '';
                        slot.forEach(row => {
                            const rowDiv = document.createElement('div');
                            rowDiv.classList.add('slot-row');
                            row.forEach(cell => {
                                const cellDiv = document.createElement('div');
                                cellDiv.classList.add('slot-cell');
                                cellDiv.textContent = cell;
                                rowDiv.appendChild(cellDiv);
                            });
                            slotResultsElement.appendChild(rowDiv);
                        });

                        if (output > 0) {
                            statusElement.textContent = `You won $${output}!`;
                            acc.account("BankAddWid", username, output).then(response => {
                                let bankbal;
                                bankbal = response;
                                bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                            })
                        } else {
                            statusElement.textContent = `You lost $${betvalue * betrows}, keep trying!`;
                            acc.account("BankAddWid", username, betvalue * betrows).then(response => {
                                let bankbal;
                                bankbal = response;
                                bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                            })
                        }

                    });
                }


            })

        });
    }
    else if (bodyId === "sign-in") {

        if (signinButton) {
            signinButton.addEventListener('click', () => {
                let user = usernameElement.value;
                let password = passwordElement.value;
                acc.account("UserVerify", user, password).then(response => {
                    if (response === true) {
                        username = user;
                        window.location.href = 'home.html';
                        localStorage.setItem('username', username);
                    } else {
                        alert("Username or password incorrect");
                    }
                });
            });
        }

        if (signupButton) {
            signupButton.addEventListener('click', () => {
                let user = usernameElement1.value;
                let password = passwordElement1.value;
                acc.account("UserAdd", user, password).then(response => {
                    if (response === "User is added successfully") {
                        username = user;
                        window.location.href = 'home.html';
                    } else {
                        alert("Username already exists");
                    }
                });
            });
        }

    }
});
