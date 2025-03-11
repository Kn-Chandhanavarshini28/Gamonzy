import { doRequest } from "./utils";
export class Game {
    async play(bet: number[]) {
        let gameRequest = {
            bets: bet
        };
        const options = {
            url: "https://c7w4so9tq4.execute-api.ap-south-1.amazonaws.com/second/first",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameRequest)
        };

        try {
            const gameResponse = await doRequest(options);
            return gameResponse
        } catch (err) {
            console.log(JSON.stringify(err));
            return undefined; 
        }
    }
}