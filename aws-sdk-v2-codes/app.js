import { docClient, tableName } from "./awsConfigsV2.js";

// All the refrences are taken from the following webpage: 
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html

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

export const updateItemToDb = async (pkValue, skValue, valuesToUpdate) => {
    
    const valuesToUpdateAttributeNames = Object.keys(valuesToUpdate)

    let updatedExpressionString = "set ";
    const tempArr = valuesToUpdateAttributeNames.map((attributes) => `${attributes} = :${attributes}`);
    updatedExpressionString = updatedExpressionString.concat(tempArr.join(", "))
    
    const ExpressionAttributeValuesObject = {}
    valuesToUpdateAttributeNames.forEach((attribute) => {
        const newKey = `:${attribute}`;
        const newValue = valuesToUpdate[attribute];
        ExpressionAttributeValuesObject[newKey] = newValue;
    });

    const params = {
        TableName: tableName,
        // update the item where key and value are the following
        Key: {
          'PK' : pkValue,
          'SK' : skValue
        },

        UpdateExpression: updatedExpressionString,
        ExpressionAttributeValues: ExpressionAttributeValuesObject
      };
      
      docClient.update(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });
}


// parameters has all the values to add to db: PK, SK and any other attributes you want
addItemToDB("qt@gmail.com", "testpass", "testname");

// // parameters has value of primaryKey and SortKey
getItemFromDb("qt@gmail.com", "testpass");

const valuesToUpdate = {
"creationDate" : "02 Jan 2023 ",
"username" : " username Jo tumhe aacha lage"
}

updateItemToDb("qt@gmail.com", "testpass", valuesToUpdate );