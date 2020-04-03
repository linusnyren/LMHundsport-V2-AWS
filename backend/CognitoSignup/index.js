const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : "admin",
  password : process.env.RDS_PASSWORD,
  database : process.env.RDS_DATABASE,
  port     : process.env.RDS_PORT
});
global.fetch = require('node-fetch');
'use strict';

module.exports.handler = async (event, callback) => {

    let lastname = event.surname //The values comes in Uppercase
    let firstname = event.givenName //The values comes in Uppercase
    let role = "user"
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"given_name",Value:firstname}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family_name",Value:lastname}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:event.email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:event.phone}));

    let CognitoID = await registerCognito(event.email, event.password, attributeList)
    console.log(CognitoID)
    let signupToUserMysql = await registerMysql(CognitoID, firstname, lastname, event.email, event.phone, role)
    
    return signupToUserMysql
};
const registerMysql=async(cognitoID, firstname, lastname, email, phone, role)=>{
    let storeUserSql= "insert into user(cognitoid, firstname, lastname, email, phone, role) values (?,?,?,?,?,?)"
    return new Promise(function(resolve, reject){
        con.query(storeUserSql,[cognitoID, firstname, lastname, email, phone, role], (err,rows) => {
            if(err) reject(err);
            else{
            resolve(rows)
            }
        })
    })

}
const registerCognito=async(email,password,attributeList)=>{
    const poolData = {
        UserPoolId : "eu-west-1_yXzFN04sP", // Your user pool id here
        ClientId : "8oj4rrnranilhjb4p7atjinjo" // Your client id here
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    return new Promise(function(resolve, reject) {
        userPool.signUp(email, password, attributeList, null, function (err, result) {
            if (err) {
                console.log(err);
                reject;
            }
            let cognitoID = result.userSub

            resolve(cognitoID);
        });
    });
}