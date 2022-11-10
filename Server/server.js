
var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./firebasekey.json"); //replace with your own firebase api key

var key = fs.readFileSync("./selfsigned.key"); //Create your own self signed key and certificate for https
var certi = fs.readFileSync("./selfsigned.crt"); //Create your own self signed key and certificate for https
var options = {
  key: key,
  cert: certi
};

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Hello World!');
})

app.get('/pending', function (req, res) { //Adds user to pending database whilst waiting for payment
    let serverid = req.query.serverid;
    let passphrase = req.query.pass;
    console.log(req.query);


    let _username = req.query.username;
    let _email = req.query.email;
    let _value = req.query.value;
    let _password = req.query.password;



    console.log(_username, _email, _value, _password);
    const docRef = db.collection('pending').doc(_username);
     docRef.set({
        accountvalue: _value,
        username: _username,
        email: _email,
        password: _password,
      });

    

    
res.header("Access-Control-Allow-Origin", "*");
res.status(200).send("Success");
})

app.get('/getMeta', async (req, res) => { //Get users meta data
    let _username = req.query.username;
    console.log(_username);
    const docRef2 = db.collection('users').doc(_username);
    await docRef2.set({
        refreshData: "true",
      });
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200).send("Success");
})

app.get('/complete', async (req, res) => { //payment verified and account created
    let serverid = req.query.serverid;
    let passphrase = req.query.pass;
    console.log(req.query);


    let _username = req.query.username;



    const docRef = db.collection('pending').doc(_username);
    const doc = await docRef.get();
    console.log(doc);
    if (!doc._fieldsProto.email) {
        console.log('No such user!');
    } else {
    const _email = await doc._fieldsProto.email.stringValue;
    const _value = await doc._fieldsProto.accountvalue.stringValue;
    const _password = await doc._fieldsProto.password.stringValue;
    const docRef2 = db.collection('users').doc(_username);
    await docRef2.set({
        accountvalue: _value,
        username: _username,
        email: _email,
        password: _password,
        mt4id: "0",
        mt4pass: "0",
        mt4value: "0",
        mt4date: "0",
        mt4challenge: "1",
      });
    const resx = await docRef.delete();
    }
    

    
res.header("Access-Control-Allow-Origin", "*");
res.status(200).send("Success");
})

app.get('/remove', async (req, res) => { //remove user from database if payment unsuccessful
    let serverid = req.query.serverid;
    let passphrase = req.query.pass;
    console.log(req.query);


    let _username = req.query.username;



    console.log(_username);
    const docRef = await db.collection('pending').doc(_username).delete();

    

    
res.header("Access-Control-Allow-Origin", "*");
res.status(200).send("Success");
})

app.get('/login', async (req, res) => { // uses firebase database to login (I used Auth0 and implemented it with this server to login users without having registrations through Auth0)
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    let _username = req.query.username;
    let _password = req.query.password;

    const docRef = db.collection('users').doc(_username);
    const doc = await docRef.get();
    const _email = await doc._fieldsProto.email.stringValue;
    console.log(doc);
    console.log(doc._fieldsProto.password.stringValue);
    console.log(doc._fieldsProto.email.stringValue);
    if (doc._fieldsProto.password.stringValue == _password) {
        res.status(200).json({ id: ("1234124124" + _username) , username: _username, email: _email});
    } else {
        res.status(401).send({status: 1, message: "Incorrect Password"});
    }




})

var server = https.createServer(options, app);
var httpServer = http.createServer(app);

httpServer.listen(8050, function() { //http server for if website doesn't have ssl
    var host = httpServer.address().address
    var port = httpServer.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
server.listen(8081, function () { //Https server for if website is on https
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at https://%s:%s", host, port)
 })