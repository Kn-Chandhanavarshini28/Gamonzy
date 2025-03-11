export class Game{
    
 symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
 currentBalance: number = 0;
 spinCount: number = 0;
 currentUser: string | null = null;
 matrix: string[][] = [];
 bet:number[]=[];

getRandomSymbol(): string {
    const randomIndex = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[randomIndex];
}

generateMatrix(): string[][] {
    this.matrix= [];
    for (let i = 0; i < 3; i++) {
        const row: string[] = [];
        for (let j = 0; j < 3; j++) {
            row.push(this.getRandomSymbol());
        }
        this.matrix.push(row);
    }
    return this.matrix;
}

 spin(bets: number[]): void {
    this.bet=bets;
    let spinCount=0;
    spinCount++;
    const matrix = this.generateMatrix();

    if (bets.filter(bet => bet > 0).length === 1 && this.isPrime(spinCount)) {
        const rowIndex = bets.findIndex(bet => bet > 0);
        matrix[rowIndex] = [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()].map(symbol => symbol =this.symbols[0]);
    } else if (bets.filter(bet => bet > 0).length === 2 && spinCount % 2 === 0) {
        for (let i = 0; i < 3; i++) {
            matrix[i] = [this.symbols[0], this.symbols[0], this.symbols[0]];
        }
    } else if (bets.filter(bet => bet > 0).length === 3 && spinCount % 3 === 0) {
        for (let i = 0; i < 3; i++) {
            matrix[i] = [this.symbols[0], this.symbols[0], this.symbols[0]];
        }
    }

}
check(){
    const rowWins = this.checkRowWin(this.matrix);
    const winnings = this.calculateWinnings(this.bet, rowWins);
    return winnings;
}  

 checkRowWin(matrix: string[][]): boolean[] {
    const rowWins: boolean[] = [false, false, false];
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
            rowWins[i] = true;
        }
    }
    return rowWins;
}
 calculateWinnings(bets: number[], rowWins: boolean[]): number {
    let winnings = 0;
    let rowsWon = rowWins.filter(win => win).length;

    if (rowsWon >= 2 && bets.filter(bet => bet > 0).length === 2) {
        winnings += 20; // Bonus for winning on 2 rows when betting on 2 rows
    }
    if (rowsWon === 3 && bets.filter(bet => bet > 0).length === 3) {
        winnings += 50; // Bonus for winning on all 3 rows when betting on all 3 rows
    }

    for (let i = 0; i < 3; i++) {
        if (rowWins[i]) {
            winnings += bets[i]; 
        }
    }

    return winnings;
}
isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

}
