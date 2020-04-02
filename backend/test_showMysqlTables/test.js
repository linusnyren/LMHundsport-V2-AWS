const mysql = require('mysql');
const database = require('../databaseconfig.json')
const con = mysql.createConnection(database);

async function main(){

    let tables = await getTables()
    console.log(await tables)
}
const getTables=async()=>{
    return new Promise(function(resolve, reject){
        con.query("show tables", (err,rows) => { //the method above doesnt return the user so we need to fetch it once again
            if(err)reject;
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}
main()