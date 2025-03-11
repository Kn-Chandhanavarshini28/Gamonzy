import { handlercc } from './src/handlercc';
let event =
{
    function: "UserAdd",
    username: "saranya",
    Userdata: "saranya saranya"
};



let print = async () => {
    let output = await handlercc(event)
    console.log(output);

}
print();     