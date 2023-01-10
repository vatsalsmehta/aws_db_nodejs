import dotenv from "dotenv";
dotenv.config();

const awsConfig = {
    "region": process.env.REGION,
    "endpoint": process.env.ENDPOINT,
    "accessKeyId": process.env.AWS_KEYID,
    "secretAccessKey": process.env.AWS_SECRETKEY
}

// Create service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Create an Amazon DynamoDB service client object.
const dynamoClientV3 = new DynamoDBClient(awsConfig);
export const tableName = process.env.TABLENAME;
export { dynamoClientV3 };