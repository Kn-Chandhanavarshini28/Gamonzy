import { Game } from './game';

const game = new Game();

export const handler = async (event: any) => {
    game.spin(event.bets);
    let one=(game.matrix);
    let two=game.check();
    let output={
        "matrix":one,
        "winnings":two
    }
    return output;
};
