const http = require('http');  // core module bolganlgi un require('http') qlsa yetarli
const mongodb = require("mongodb");  // external package


// 2ta variable kkk boladi
let db;  // 1-variable
const connectionString = "mongodb+srv://mukhlisamakhmaraimova03:qkQ5xeHzaj9v0TCm@cluster0.mxami.mongodb.net/Reja?authSource=admin&retryWrites=true&w=majority"; // 2variable


// mongodb ichidagi connect metodi ichiga 3ta narsa path qlnadi
mongodb.connect(connectionString, {   // connect -> mongodb metodi
    useNewUrlParser: true,
    useUnifieldTopology: true
    }, (err, client) => {   // callback function: error va data
        if(err) console.log("ERROR on connection MONGODB");  // connection muvaaffaqiyatsz bolsa error bersn
        else {  // aks holda server ishga tushsn
            console.log("MongoDB connection succeed!");
            // console.log(client); // client nmalardan iboratligi korsa boladi (consoleda)
            module.exports = client;   // server.js faylidan export qlb olnadi
            const app = require("./app");  // app.js fayli ishga tushadi
            const server = http.createServer(app)              // app -> single thread -> hamma userlar requesti shu yerga kelb tushadi
            let PORT = 3000;
            server.listen(PORT, function() {  // server ni 3000-portga listen qlsh
                console.log(
                    `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
                );
            });
        }
    });

// database bn muvaf ulangan+ kn server ishga tushadi => sababi db ga ulanmasa malumot ololmaydi
// database server => seuol da joylashdaa!

