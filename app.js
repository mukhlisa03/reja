console.log("Web Serverni boshlash!");
// express install qlnadi(terminalda)
const express = require("express");
const app = express(); // express ning app objecti, instint sifatida


// MongoDB chaqrsh
const db = require("./server").db();  // server.js dan client chqarb olnadi client ichda db olb beradi


const fs = require("fs");   // File System -> core module

let user;  // user -> object
fs.readFile("database/user.json", "utf8", (err, data) => {  // fs orqali database folderdagi user.json fileni oqshga harakat qladi
    if(err) {
        console.log("ERROR:", err);
    } else {  // agar xatolik bolmaganda
        user = JSON.parse(data);   // fs oqigan datani json dan object ga parse qlnadi
    }
});


// JSON bn Objectni farqi -> JSON da key da ham qoshtirnoq boladi yani => "name": "Mukhlisa"
// parse -> qlganda key dagi qoshtrnoqni olb object ga aylantrb beradi


// nodemon -> code ga kirtlgan ozgarshni avtomatk saqlab serverni ishga tushrb beradi doim -> npm run dev orqali ishga tushadi


// 1 -> Kirish code: express ga kirb kelayogan malumotga mos code yozladi
app.use(express.static("public"));  // har qanday browserdan krish uchun public folder ochiq  (styling and images)
app.use(express.json());   // json formatida kelgan datani object holatiga ogrb beradi
app.use(express.urlencoded({extended: true}));  // form dan biron bir narsa POST bolsa, express serverimz qabul qlb oladi  (aks holda ignore qlnadi)

// 2-> Session code

// 3->Views code.   BSSR(backend server side rendering)-> traditional usul(backendda view yasash). 
// install ejs -> view yasash uchun folder -> ejs
app.set("views", "views"); // folderni korsatmz(view) nomli
app.set("view engine", "ejs");  // view engine -> ejs orqali (frontend yasaladi)


// 4-> Routing code
app.get("/hello", function(req, res) {   // browserda /hello db yozlsa chqshi kk bolgan text |
    res.end(`<h1 style="background: violet">HELLO WORLD by Mukhlisa</h1>`);
});

app.get("/gift", function(req, res) {
    res.end(`<h1>Siz sovg'alar bo'limidasiz!</h1>`);
});


app.post("/create-item", (req, res) => {
    console.log('user entered /create-item');
    // console.log(req.body);
    // res.json({test: "success"});  // kelgan malumot json format qaytadi
    // // TODO: code with db here

    console.log(req.body);
    // res.end("success!");  // malumot krtlganda userga yuboriladgan malumot
    const new_reja = req.body.reja;    // bzni yangi reja mz body qsmidan kelgan reja ga teng
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
        if(err) {
            console.log(err);
            res.end("sometihing went wrong!");
        } else {
            // console.log(data);
            res.end("successfully added!");
        }
    });  // new_reja ni reja nomi bn database ga yoziladi
});


app.get('/author', (req, res) => {
    res.render("author", {user: user});   // render orqali author.ejs pagega yuboradi
})



// localhost ga kirganda malumotlarni oqidi shu yerdan: db => obj dan foydalan CRUD opert amalga oshrladi
app.get("/", function (req, res) {
    console.log('user entered /');
    db.collection("plans").find().toArray((err, data) => {  // callback func
        if(err) {
            console.log(err);
            res.end("something is wrong");  // xatolik yusaga kelganda qaytadigan response
        } else {
            // console.log(data);
            res.render("reja", {items: data});  // render -> views papkasidagi ma'lum bir shablon faylni chaqirladi: bu yerda (harid.ejs) chaqrdi
        }     // items: data => reja.ejs fayli uchun path qlnadi
    });
}); 

// req: foydalanuvchidan kelgan so'rov (request).
// res: serverdan foydalanuvchiga qaytariladigan javob (response).





// server.js ga kochrladi bu yerda ishlatlmaydi
// const server = http.createServer(app)              // app -> single thread -> hamma userlar requesti shu yerga kelb tushadi
// let PORT = 3000;
// server.listen(PORT, function() {  // server ni 3000-portga listen qlsh
//     console.log(
//         `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
//     );
// });

     

// Frontendni qurish 2xil usulda boladi:
// 1-> Traditional usul: (ejs framework orqali backend ichida frontend qurladi) BSSR
// 2-> single page application (react frameworki orqali)





module.exports = app;  // app objectini export qln olnadi











