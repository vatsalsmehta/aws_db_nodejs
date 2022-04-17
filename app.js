var express = require('express');
var bodyParser = require('body-parser');


//Aws  Ke Settings
var AWS = require("aws-sdk");
var awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAZRN5MRSIUTGVDTVE", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

var app = express();
app.use(bodyParser.json());
app.use(express.static('views')); //This dir contains html and css codes
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = 3000;
console.log(port);
app.listen(port, function () {
    console.log("Server Has Started!");
});

app.get('/', function (req, res) {

    res.send("Welcome to National Phonebook Directory's Website\n You can add yourself to this database and check all other users in the database ")
    console.log("It has Started");
    res.set({
        'Access-control-Allow-Origin': '*'
    }); 0
    return res.redirect('index.html');
})

app.get('/view_data', function (req, res) {
    var params = {
        TableName: "delivery-orders"
    };

    docClient.scan(params, onScan);
    var count = 0;

    function onScan(err, data) {
        arr = [];
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (itemdata) {
                console.log("Item :", ++count, JSON.stringify(itemdata));
                arr.push(itemdata)
            });

            // continue scanning if we have more items
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }


        res.send("Welcome to National Phonebook Directory's Website.<br>View all Registered Users Below<br> " + JSON.stringify(arr));
    }
})

app.post('/sign_up', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var phone = req.body.phone;
    var pincode = req.body.pincode;


    let save = function () {

        var data = {
            "subject": "ccl",
            "expno": "exp6",
            "name": name,
            "email": email,
            "address": address,
            "phone": phone,
            "pincode": pincode
        }

        var params = {
            TableName: "delivery-orders",
            Item: data
        };
        docClient.put(params, function (err, data) {

            if (err) {
                console.log("users::save::error - " + JSON.stringify(err, null, 2));

            } else {
                console.log("users::save::success");
                return res.redirect('signup_success.html');
            }
        });
    }

    save();

})