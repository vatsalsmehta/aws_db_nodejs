import { dynamoClientV3 } from "./awsConfigsV3.js";

// Import required AWS SDK clients and commands for Node.js
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";

// Set the parameters
export const params = {
    RequestItems: {
        TABLE_NAME: {
            Keys: [
                {
                    KEY_NAME_1: { N: "KEY_VALUE" },
                    KEY_NAME_2: { N: "KEY_VALUE" },
                    KEY_NAME_3: { N: "KEY_VALUE" },
                },
            ],
            ProjectionExpression: "ATTRIBUTE_NAME",
        },
    },
};
export const run = async () => {
    try {
        const data = await dynamoClientV3.send(new BatchGetItemCommand(params));
        console.log("Success, items retrieved", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};


run();