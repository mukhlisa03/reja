console.log("Web Serverni boshlash!");
// express install qlnadi(terminalda)
const express = require("express");
const app = express(); // express ning app objecti, instint sifatida
const http = require('http');  // core module bolganlgi un require('http') qlsa yetarli

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


const server = http.createServer(app)              // create qlngan app ni path qlb qoyamz
let PORT = 3000;
server.listen(PORT, function() {  // server ni 3000-portga listen qlsh
    console.log(`The server is running successfully on port: ${PORT}`);
})



// Frontendni qurish 2xil usulda boladi:
// 1-> Traditional usul: (ejs framework orqali backend ichida frontend qurladi) BSSR
// 2-> single page application (react framewori orqali)

