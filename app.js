import { docClient, tableName } from "./awsconfig.js";

export const addItemToDB = async(email, password, username) => {
    
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

export const getItemFromDb = async (pkValue, skValue) => {

    // to get a single record we search by its PK and SK
    const params = {
        TableName: tableName,
        Key: {
            "PK": pkValue,
            "SK": skValue
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Read successfull", data.Item);
        }
    });
}


addItemToDB("qt@gmail.com", "testpass", "testname");
getItemFromDb("qt@gmail.com", "testpass");