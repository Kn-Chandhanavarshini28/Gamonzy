import { Account } from "./src/acc";
let acc = new Account();
acc.account("BankAddWid","CHANDHANAVARSHINI",10000).then(Response=>{
    console.log(Response);

});
import { Game } from "./src/game";
let game=new Game();
game.play([100,30]).then(Response=>{
    console.log(Response);
})