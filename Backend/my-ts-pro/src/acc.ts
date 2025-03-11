import * as AWS from 'aws-sdk';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: 'ap-south-1' });
const docClient = DynamoDBDocumentClient.from(client);
export const getBankBalance = async (User_name: string) => {
    const command = new GetCommand({
        TableName: "Gamonzy_d",
        Key: { User_name },
    });
    const response = await docClient.send(command);
    if (response.Item) {
        return response.Item.User_balance;
    }
    else {
        return undefined
    }
};
export const BankAddWid = async (User_name: string, amount: number) => {
    let currentbal: number;
    currentbal = await getBankBalance(User_name);
    if (Number.isInteger(amount) == true) {
        const newBalance = currentbal + amount;
        const command = new UpdateCommand({
            TableName: "Gamonzy_d",
            Key: { User_name },
            UpdateExpression: "SET User_balance = :amount",
            ExpressionAttributeValues: { ":amount": newBalance },
            ReturnValues: "ALL_NEW",
        });


        const response = await docClient.send(command);
        if (response.Attributes) {
            return response.Attributes.User_balance;
        } else {
            return undefined
        }
    }
    else {
        return "enter valid integer"
    }
};
export const fire = async (User_name: string, Password: string) => {
    if (await getBankBalance(User_name) === undefined) {
        const command = new PutCommand({
            TableName: "Gamonzy_d",
            Item: {
                User_name,
                Password,
                User_balance: 0
            },
        });

        await docClient.send(command);
        return 'User is added successfully';
    } else {
        return 'Existing user!';
    }
};
export const userVerify = async (User_name: string, Password: string) => {
    if (await getBankBalance(User_name) === undefined) {
        return false;
    } else {
        const command = new GetCommand({
            TableName: "Gamonzy_d",
            Key: { User_name },
        });
        const response = await docClient.send(command);
        if (response.Item) {
            if (response.Item.Password == Password) {
                return true
            }
            else {
                return false
            }
        }
        // return response.Item?.Password === Password || false;
    }
};

