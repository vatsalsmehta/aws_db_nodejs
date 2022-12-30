import { docClient, tableName } from "./awsconfig.js";

export const handleSignUp = async(email, password, username) => {
    
    // I have given Partition key and sort key as PK and SK respectively
    const data = {
        "PK": email,
        "SK": password,
        "username": username,
    }

    const transactionItem = {
        TableName: tableName,
        Item: data
    };

    docClient.put(transactionItem, function (err) {
        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::save::success");
        }
    });

}

handleSignUp("qt@gmail.com", "testpass", "testname");