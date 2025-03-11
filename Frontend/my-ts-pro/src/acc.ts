import { doRequest } from "./utils"



export class Account {

    async account(func: string, username: string, userdata?:any) {

        let gameRequest = {
            function: func,
            username: username,
            Userdata:userdata 
        }
        const options = {
            url: "https://c7w4so9tq4.execute-api.ap-south-1.amazonaws.com/second/cc",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameRequest)
            // qs: {
            //     bet: bet
            // }
        };

        try {
            const gameResponse = await doRequest(options);
            return gameResponse
        } catch (err) {
            console.log(JSON.stringify(err))
        }
    }

}