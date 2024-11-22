const http = require('http');  // core module bolganlgi un require('http') qlsa yetarli
const mongodb = require("mongodb");  // external package


let db;
const connectionString = "mongodb+srv://mukhlisamakhmaraimova03:qkQ5xeHzaj9v0TCm@cluster0.mxami.mongodb.net/";


// mongodb ichidagi connect metodi ichiga 3ta narsa path qlnadi
mongodb.connect(connectionString, {
    useNewUrlParser: true,
    useUnifieldTopology: true
    }, (err, client) => {   // callback function: error va data
        if(err) console.log("ERROR on connection MONGODB");  // connection muvaaffaqiyatsz bolsa 
        else {  // aks holda server ishga tushsn
            console.log("MongoDB connection succeed!");
            // console.log(client); // client nmalardan iboratligi korsa boladi
            module.exports = client;   // server.js faylidan export qlb olnadi
            const app = require("./app");  // app.js fayldagi app ni chaqrb olnadi
            const server = http.createServer(app)              // app -> single thread -> hamma userlar requesti shu yerga kelb tushadi
            let PORT = 3000;
            server.listen(PORT, function() {  // server ni 3000-portga listen qlsh
                console.log(
                    `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
                );
            });
        }
    });



// HomeTask

// B-TASK: 

// Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan raqamlarni sonini bizga return qilsin.
// MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return qiladi.


function countDigits(str) {
    let count = 0;                     // Raqamlarni sanash un boshlangich qiymat => 0
    for (let char of str) {            // Har bir belgini string ichidan tek
        if (char >= '0' && char <= '9') {        // Agar belgi raqam bo'lsa... (0 va 9) orasida
            count++;                // Raqamlarni birga oshrb ketiladi
       }
    }
    return count;                   // Umumiy raqamlar sonini return qlamz
}

console.log(countDigits("ad2a54y79wet0sfgb9"));  // 7ta
console.log(countDigits("mukhlisa0304"));  // 4ta

