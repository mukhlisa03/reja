console.log("Web Serverni boshlash!");
// express install qlnadi(terminalda) => external package
const express = require("express");
const app = express(); // express ning app objecti, instint sifatida


// MongoDB chaqrsh
const client = require("./server") // client require qlb olndi
const db = client.db();  // client= db objecti
// const db -> variable name
const mongodb = require("mongodb");  // 

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


// JSON bn Objectni farqi -> JSON da key da ham qoshtirnoq boladi yani => "name": "Mukhlisa"
// parse -> qlganda key dagi qoshtrnoqni olb object ga aylantrb beradi


// nodemon -> code ga kirtlgan ozgarshni avtomatk saqlab serverni ishga tushrb beradi doim -> npm run dev orqali ishga tushadi


// 1 -> Kirish code: express ga kirb kelayogan malumotga mos code yozladi
app.use(express.static("public"));  // har qanday browserdan krish uchun public folder ochiq: 
app.use(express.json());   // json formatida kelgan datani object holatiga ogrb beradi:middleware db REST API ni handle qladi
app.use(express.urlencoded({extended: true}));  // form dan biron bir narsa POST bolsa, express serverimz qabul qlb oladi  (aks holda ignore qlnadi): middleware db: traditional API

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
    // console.log("STEP2: FRONTEND DAN => BACKEND GA KIRISH");
    // console.log(req.body);
    // res.json({test: "success"});  // kelgan malumot json format qaytadi
    // // TODO: code with db here
    

    console.log(req.body);
    // res.end("success!");  // malumot krtlganda userga yuboriladgan malumot
    const new_reja = req.body.reja;    // bzni yangi reja mz rreq.body qsmidan kelgan reja ga teng
    // console.log("STEP3: BACKEND DAN => DATABASE GA BORISH");
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {  // insertOne -> 2ta parametr ga ega: 1ga=> reja nomi bn req.bodyni ichidan kelgan reja yozladi, 2-> callback
        // if(err) {  // errror mavjud bolsa
        //     console.log(err);
        //     res.end("sometihing went wrong!");  // user ga yuboriladigan xabar
        // } else {  // error mavjud bolmasa
        //     // console.log(data);
        //     res.end("successfully added!");   // userga boradigan xabar
        // }  // traditional postga moljalab yozlgan!
        // console.log("STEP4: DATABASE DAN => BACKEND GA QAYTISH");
        // modern post qlsh (browser.js uchun)
        console.log(data.ops);  // data obj larni korsa boladi
        res.json(data.ops[0]);   // data obj ichida ops dgan obj bor uni ichidagi 1chi indexli array yuboriladi
        // console.log("STEP5: BACKEND DAN => FRONTEND GA JAVOB");
    });  // new_reja ni reja nomi bn database ga yoziladi, kn callback chaqrladi
});

// Form Post orqali request qismiga "item" nomi bn value yuborayotgani nomi "reja" ga ozgartriladi
// reja ni form ga yozb enter bosganda create-item url ga post qladi


app.post("/delete-item", (req, res) => {  // callback
    const id = req.body.id;   // ochrmoqchi bolgan idni req body qsmdagi id dan olnadi; bzga kelayotgan id stringdan iborat uni mongodb ni mongo id siga otkazsh un mongodb ni require qlb olndi
    // console.log(id);
    // res.end("done");
    // mongodb => id ni qiymatigina emas, type ni ham talab qladi => mongodb.ObjectId
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
    console.log(data);
    db.collection("plans").findOneAndUpdate(
        { _id: new mongodb.ObjectId(data.id) }, 
        {$set: {reja: data.new_input} }, 
        function(err, data) {
            res.json({state: "success"});
        }
    );
    // res.end("done");
});


app.post("/delete-all", (req, res) => {
    if (req.body.delete_all) {
        db.collection("plans").deleteMany(function() {
            res.json({ state: "hamma rejalar ochirildi!"});
        });
    }
})





app.get("/author", (req, res) => {
    res.render("author", {user: user});   // render orqali author.ejs pagega yuboradi
})


// harakat FRONTEND dan boshlanyapti: 1-STEP: localhostga kirsh joyi
// localhost ga kirganda malumotlarni oqidi shu yerdan: db => obj dan foydalan CRUD opert amalga oshrladi
app.get("/", function (req, res) {
    console.log('user entered /');   // glavniy page ga kirganda console ga ushbu text chqadi
    console.log("STEP2: FRONTEND DAN => BACKEND GA KIRISH");

    console.log("STEP3: BACKEND DAN => DATABASE GA BORISH");
    db.collection("plans")  // plans nomli collection ichida kiradi
     .find()  // plans ichidagi hamma malumot oqiladi
     .toArray((err, data) => {   // oqlgan hamma malumot arrayga otkaziladi
        if(err) {   // toArray 2 ta qiymat qaytaradi (err, data)
            console.log(err); // databasedan togri malumot ololmaganda error yuzaga keladi
            res.end("something is wrong");  // xatolik yuzaga kelganda qaytadigan response
        } else { // databasedan togri malumot olnganda else qsmi ishledi
            console.log("STEP4: DATABASE DAN => BACKEND GA QAYTISH");
            console.log(data); // databasedan olngan malumotni korsh mn
            
            console.log("STEP5: BACKEND DAN => FRONTEND GA JAVOB");
            // res.send("DONE");
            res.render("reja", {items: data});  // render -> views papkasidagi ma'lum bir shablon faylni chaqirladi: bu yerda (reja.ejs) chaqrdi:  items:data => object yasab path qlnadi
        }     // items: data => reja.ejs fayli uchun path qlnadi
    });
}); 

// database ga id ni avtamatik tarzda qoshb beradi bu kelajakda usha rejaga ozgartrsh kirtsh kk bolganda yordam beradi
// <% %> -> ejs ga yuklangan malumotlarni ejs ichida korsh un foydladi
// <%= &>  -> qiymat qaytarsh kk bolgana % dan kn = qoyladi

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

// <!-- ejs ga yuklangaan qiymatlarni qob oladi -->
        // <!-- <%= items[0].reja %> -->



module.exports = app;  // app objectini export qln olnadi












