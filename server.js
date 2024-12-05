const http = require('http');  
const mongodb = require("mongodb");  



let db;  
const connectionString = "mongodb+srv://mukhlisamakhmaraimova03:qkQ5xeHzaj9v0TCm@cluster0.mxami.mongodb.net/Reja?authSource=admin&retryWrites=true&w=majority"; 



mongodb.connect(connectionString, {   
    useNewUrlParser: true,
    useUnifieldTopology: true
    }, (err, client) => {   
        if(err) console.log("ERROR on connection MONGODB");  
        else {  
            console.log("MongoDB connection succeed!");
            // console.log(client); // 
            module.exports = client;   // server.js faylidan export qlb olnadi
            const app = require("./app");  // app.js fayli ishga tushadi
            const server = http.createServer(app)              
            let PORT = 6008;
            server.listen(PORT, function() {  
                console.log(
                    `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
                );
            });
        }
    });
    

// database bn muvaf ulangan+ kn server ishga tushadi => sababi db ga ulanmasa malumot ololmaydi
// database server => seuol da joylashgan!

