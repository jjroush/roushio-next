import {DynamoDBClient, QueryCommand} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-east-1",
});

const thirtyDaysAgo = new Date();

thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
const timestampThreshold = thirtyDaysAgo.toISOString();

const getLocalDynamo = () => {
    const command = new QueryCommand({
        TableName: "local-grocery-price-changes",
        KeyConditionExpression: "productId = :pk and #ts > :ts",
        ExpressionAttributeNames: {
            "#ts": "timestamp",
        },
        ExpressionAttributeValues: {
            ":pk": { N: "0" },
            ":ts": { S: timestampThreshold },
        }
    });

    return client.send(command).then(data => data.Items);
};

const getNationalDynamo = () => {
    const command = new QueryCommand({
        TableName: "national-grocery-price-changes",
        KeyConditionExpression: "productId = :pk and #ts > :ts",
        ExpressionAttributeNames: {
            "#ts": "timestamp",
        },
        ExpressionAttributeValues: {
            ":pk": { N: "0" },
            ":ts": { S: timestampThreshold },
        }
    });

    return client.send(command).then(data => data.Items);
};

export {
    getLocalDynamo,
    getNationalDynamo,
};