console.log("FrontEnd JavaScript is working now!");

// Browser.js only belongs to the frontend! The frontend only starts in the console section. It didn't work in the backend part



function itemTemplate(item) {   
    return `<li 
                style="background-color: #f4ff4e;"
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


let createField = document.getElementById("create-field");  // create-field -> input where we are adding a new plan

document
    .getElementById("create-form")     // create-form in ejs
    .addEventListener("submit", function (e) {
        console.log("STEP1: FRONTEND dan => BACKEND ga malumot jonatish");
        e.preventDefault();  // TRADITIONAL API ni toxtatish maqsadida (Trad Api vazifasi -> boshqa page ga yuborvoradi)

        axios.post("/create-item", {reja: createField.value})    // axios post metod => 1-arg: bolajak requestni headeri, 2-arg bolajak reuestni body si
            .then((response) => {
                // WAITING ....
                console.log("STEP6: FRONTEND ga qaytish va FRONTEND amallari!");
                console.log(response);

                document
                    .getElementById("item-list")
                    .insertAdjacentHTML("beforeend", itemTemplate(response.data))  
                createField.value = "";   
                createField.focus();
            })
            .catch((err) => {
                console.log("Iltimos qaytadan harakat qiling!");
            });

    });  

    // yangi reja submit bolganda kn "create-item" linkiga otb "successfully added" xabarini berardi userga 
    // endi usha boshqa page ga otmasligi un preventDefault dan foyd.di

    // axios => traditional usulda emas, modern usulda POST bolyapti

    // ajacs, fetch, axios  => packages





document.addEventListener("click", function (e) {  
    console.log(e);  // frontend qismida (consoleda chqarmedi!)
    // delete oper
    if(e.target.classList.contains("delete-me")) { 
        // alert("siz delete tugmasini bosdingiz!");  
        if(confirm("Aniq ochirmoqchimisiz?")) {  
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


    if (e.target.classList.contains("edit-me")) {  
        // alert("siz edit tugmasini bosdingiz!");
        let userInput = prompt(  // var name prompt ta tenglanadi: prompt -> malumotni ozgartrb qoshish vazifasini bajaradi
            "O'zgartirish kiriting",
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
        );                       
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

// traditional api dan  rest api ga otgazish

// page ablavleniya qmagunmzcha ejs shu paytgacha bir marta ishlagandi
// ejs => bu qayta qayta ishga tushmedi (backend da)
// REST API lar orqali har xil operat qlnsa, uni yangilanmasdan turb ozgartsh ekan!


// TRADITIONAL API => page ni har safar abnavliniya qlshga sabab boladi
// REST API => birgina qurlgan html bilan pastda javascript orqali axios backenddan malumot olb kelb, tepani ozgartrb qoyyapti xolos yani
// malumotni ablavliniya qmasdan qoshadi  