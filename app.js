// express will start if after mongodb connection is successful!

console.log("Web Serverni boshlash!");
const express = require("express");
const app = express(); 
// through the app -> we can build a web server


// Call => MongoDB
const client = require("./server") // client is required
const db = client.db();  // client's db object -> performs CRUD operation
const mongodb = require("mongodb");  

/*const fs = require("fs");   // File System -> core module
let user;  // user -> object
fs.readFile("database/user.json", "utf8", (err, data) => {  // fs orqali database folderdagi user.json fileni oqshga harakat qladi
    if(err) {
        console.log("ERROR:", err);
    } else {  // agar xatolik bolmaganda
        user = JSON.parse(data);   // fs oqigan datani json dan object ga parse qlnadi
    }
});
*/




// 1 => Kirish code(Access code):
app.use(express.static("public"));  // middleware design pattern
app.use(express.json());   // middleware design pattern REST API
app.use(express.urlencoded({extended: true}));  // middleware design pattern: traditional API

// 2-> Session code

// 3->Views code.  
// There are 2 ways to build the frontend: 1-> BSSR (build the frontend in the backend) -> through ejs framework, 2-> Single page Appication
app.set("views", "views"); // folderni korsatmz(view) nomli yani views lar views folderini ichida
app.set("view engine", "ejs");  // view engine -> ejs orqali (frontend yasaladi), yani backendda frontenddni quradgan enginimz


// 4-> Routing code
// API 3 types -> REST API, TRADITIONAL API, GRAPHQL API
// API HAS HEADER AND BODY, that is, header and body     => dafatardan qarash
// API 2 types METHOD: get and post
app.get("/hello", function(req, res) {   
    res.end(`<h1 style="background: violet">HELLO WORLD by Mukhlisa</h1>`);
});

app.get("/gift", function(req, res) {
    res.end(`<h1>Siz sovg'alar bo'limidasiz!</h1>`);
});


app.post("/create-item", (req, res) => {
    console.log('user entered /create-item');
    console.log("STEP2: FRONTEND DAN => BACKEND GA KIRISH");
    console.log(req.body);
    // res.json({test: "success"});  // incoming data returns json format but returns undefined when preventdefault is used
    // // TODO: code with db here
    

    const new_reja = req.body.reja;    // new plan is equal to the plan from req.body
    console.log("STEP3: BACKEND DAN => DATABASE GA malumotni CRUD (create) qlnadi");
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {  // insertOne -> 2ta argument ga ega: 1ga=> reja nomi bn req.bodyni ichidan kelgan reja yozladi, 2-> callback
        // if(err) {  
        //     console.log(err);
        //     res.end("sometihing went wrong!");  
        // } else {  
        //     // console.log(data);
        //     res.end("successfully added!");  
        // }  // traditional postga moljalab yozlgan!
        console.log("STEP4: DATABASE DAN => BACKEND GA QAYTISH");
        console.log(data.ops);  
        console.log("STEP5: BACKEND DAN => FRONTEND GA malumotni JSON formatda jonatish!");
        res.json(data.ops[0]);   
    });  
});

// Form Post orqali request qismiga "item" nomi bn value yuborayotgani nomi "reja" ga ozgartriladi
// reja ni form ga yozb enter bosganda create-item url ga post qladi



app.post("/delete-item", (req, res) => {  // callback
    const id = req.body.id;   // ochrmoqchi bolgan idni req body qsmdagi id dan olnadi; bzga kelayotgan id stringdan iborat uni mongodb ni mongo id siga otkazsh un mongodb ni require qlb olndi
    // mongodb => requires not only the value of the id, but also the type => mongodb.ObjectId
    db.collection("plans").deleteOne(
        {_id: new mongodb.ObjectId(id)}, 
        function(err, data) {
            res.json({state: "success"});
        }
    );   
});


// edit API uchun
app.post("/edit-item", (req, res) => {   
    const data = req.body;
    console.log(data);  // bz jonatdgan data keladi
    db.collection("plans").findOneAndUpdate(
        { _id: new mongodb.ObjectId(data.id) }, // ObjectId => bz jonatadgan datani mongodb ozi tushunadgan tilga ozgartrb oladi
        {$set: {reja: data.new_input} }, // set => faqat yangilangan malumotnigina saqlab qoladi: (faqat ozgartrmochi bolgan data gina ozgaradi). set qoylmasa kirtlgan malumot qoladda qolganlari ocb ketadi ekan
        function(err, data) {
            res.json({state: "success"});
        }
    );
});


app.post("/delete-all", (req, res) => {
    if (req.body.delete_all) {
        db.collection("plans").deleteMany(function() {
            res.json({ state: "All plans has been deleted!"});
        });
    }
})  





app.get("/author", (req, res) => {
    res.render("author", {user: user});   
})


// action is starting from FRONTEND: STEP 1: enter the localhost(3000-port)
app.get("/", function (req, res) {
    console.log('user entered /');   // When entering the main page, this text is output to the console
    console.log("STEP2: FRONTEND DAN => BACKEND GA KIRISH");

    console.log("STEP3: BACKEND DAN => DATABASE GA BORISH");
    db.collection("plans")  
     .find() 
     .toArray((err, data) => {   
        if(err) {   
            console.log(err); // an error occurs when the correct information is not received from the database
            res.end("something is wrong");  
        } else { // the else part worked when the correct information was received from the database
            console.log("STEP4: DATABASE DAN => BACKEND GA QAYTISH");
            console.log(data); // check the information received from the database
            
            console.log("STEP5: BACKEND DAN => FRONTEND GA JAVOB");
            res.render("reja", {items: data});  // render -> views papkasidagi (reja.ejs) chaqrdi:  items:data => object yasab path qlnadi
        }  
    });
}); 




// req: request from the user.
// res: response from the server to the user




module.exports = app;  // export the app object












