import { getBankBalance, BankAddWid, fire, userVerify } from "./acc"
export const handlercc = async (event: any) => {
    let output;
    switch (event.function) {
        case "BankAddWid":
            output = await BankAddWid(event.username, event.Userdata);
            break;
        case "getBankBalance":
            output = await getBankBalance(event.username);
            break;
        case "UserAdd":
            output = await fire(event.username, event.Userdata)
            break;
        case "UserVerify":
            output = await userVerify(event.username, event.Userdata)
            break;
        default:
            output = "undefined function"
    }
    return output;
}