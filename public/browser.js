// const { response } = require("../app");

// const { response } = require("../app");

// const { response } = require("../app");

console.log("FrontEnd JS ishga tushdi!");

// Browser.js faqat frontend ga tegishli! frontend ni console qsmidagina ishga tushadi. backend qsmda ishlamedi
// create-item qlnsa succesfully qoshsh kk hech qanqa refreshlarsz~~

function itemTemplate(item) {   
    return `<li 
                class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
                <span class="item-text">${item.reja}</span>
                <div>
                    <button data-id="${item._id}"
                         class="edit-me btn btn-secondary btn-sm mr-1">
                        Ozgartirish
                    </button>
                    <button data-id="${item._id}"
                         class="delete-me btn btn-danger btn-sm">O chirish</button>
                </div>
            </li>`;
}


let createField = document.getElementById("create-field");  // ejs dagi id si create-field orqali qiymat hosil qlnadi, createField variable tenglashtrb olnadi

document
    .getElementById("create-form")     // ejs dagi idsi create-form ga teng bolgan create from olnadi
    .addEventListener("submit", function (e) {
        e.preventDefault();  // boshqa page ga by default otb ketmasligi un

        axios.post("/create-item", {reja: createField.value})    // axios post metodi(create-item=> url ga yuboradi: create-field yani input ga krtlgan narsani valuesini reja ga tenglashtrb axios orqali post qlnadi
            // server dan kelgan response then va catch orqali ifoda etladi
            .then((response) => {
                document
                    .getElementById("item-list")
                    .insertAdjacentHTML("beforeend", itemTemplate(response.data))  // ejs dagi item-list 
                createField.value = "";   // input da malumot krtgndan kn malumot ochb ketb (inputda) bor focus usha inputga qaratilishi un
                createField.focus();
            })
            .catch((err) => {
                console.log("Iltimos qaytadan harakat qiling!");
            });

    });  // shu forma submit bolganda, func ishga tushishi kk!  => addEventListener
    // insertAdjacentHTML  => shakllangan list ning oxiriga element qoshish: beforeend => tugashidan oldn(1chi parametr), 2-parametr form post bb success bolgandan kn item listni oxiriga qoshish bersh kk bolgan view(html)yozldi itemTemplate orqali yasaldi va u ichida qanaqadr response ni oladi yani axios qaytargan response ichida bir nechta obj bor lk aynan response ning data obj server bergan data hisb.di

    // yangi reja submit bolganda kn "create-item" linkiga otb "successfully added" xabarini berardi userga 
    // endi usha boshqa page ga otmasligi un preventDefault dan foyd.di

    // axios => traditional usulda emas, modern usulda POST bolyapti
    // function ga json ni yuborsh kk

    // axios -> json formatni qabul qlb, avtomatik ravishda obj qberadi
    // axios -> post qlayotgan payti ham obj jsonga aylantr post qlb yuboradi




/* github
git status
git add .
git status
git commit -m "feat: FrontEnd JavaScriptni qurish"
git log --oneline
*/ 



document.addEventListener("click", function (e) {  // func parametri -> parametr (e) ichida nma borligini korstab beradi
    console.log(e);  // frontend qismida (consoleda chqarmedi!)
    // delete oper
    if(e.target.classList.contains("delete-me")) { // delete buttoni uchun
        // alert("siz delete tugmasini bosdingiz!");  
        if(confirm("Aniq ochirmoqchimisiz?")) {  // confirm => browser elementi   // 2ta button chqaradi: yes va no: yes == true
              // ochrmoqci bolgan qymatni getAttribute ni data-id bn olnadi
          axios
            .post("/delete-item", {id: e.target.getAttribute("data-id")})
            .then((response) => {
                console.log(response.data);
                e.target.parentElement.parentElement.remove();
            })
            .catch((err) => {
                console.log("Iltimos qaytadan harakat qiling!");
            });
        
        }        
    }  


    // edit oper
    if (e.target.classList.contains("edit-me")) {  // edit buttoni uchun
        // alert("siz edit tugmasini bosdingiz!");
        let userInput = prompt(
            "O'zgartirish kiriting",
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
        );                       // browser command -> edit un
        if(userInput) {  // malumot bor bolsa
            // console.log(userInput); //frontend qsmdagi browserda korndi
            axios
              .post("/edit-item", {    // backend API post qlsh uchun, edit qlmoqc -> id
                id: e.target.getAttribute("data-id"), 
                new_input: userInput,
            })
            .then((response) => {
                console.log(response.data);
                e.target.parentElement.parentElement.querySelector(
                    ".item-text"
                ).innerHTML = userInput;  // edit qlngach eski reja yangi rejaga ozgartrldi
            })
            .catch((err) => {
                console.log("Iltimos qaytadan harakat qiling!");
            }); 
        }
    }
});


document.getElementById("clean-all").addEventListener("click", function () {
    axios.post("/delete-all", { delete_all: true}).then((response) => {
        alert(response.data.state);
        document.location.reload();
    });
}); 
    

// e ni targetini ichida classList hamda contains -> buyrugi bor
// contains => delete-me => class nomi ichida mavjudmi dgan manoni beradi
