// console.log("train task ishga tushdi!");   // nodemon orqali ishga tushryapti (package json da berilishi shart!)

/* 
 nodejs -> single thread(bir xonali)
bitta xona hamma userlarni requesti uchun yetarli
Yuborilgan request faqat usha xonada bolmedi, thread pool(kichkina xonalarga) yukledi
thread ga yordam thread pool mavjud
libuv(engine) yordam beradi
single thread ishlab "event loop"(looping hodisasi) yuzaga keladi
va event loop ozini tasklarini thread larga taqsmlab beradi
nodejs da kamida (4ta) thread pool ishlab turadi
kam xarajatlilikni ta'mirledi
!! thread da notogri logika tashkil qlb qoylsa boshqa clinetlarga javob berome qoladi
!! togri logika qlsh un asynchronic hamda callback func yaxshi blsh kk!!



 php -> multi thread(kop xonali)
 userlar backend serverga request yuborganda har bir user un alohida xona ochiladi
 mn: 1000000000 user bolsa xuddi shuncha xona ochilishini talab qladi
 user saving jihatdan kop xarajatli methodligi kornb turbdi!


*/


// Callback function

// console.log("Jack Ma maslahatlari");
// const list = [
//     "yaxshi talaba boling",   // 0-20 yoshda
//     "togri boshliq tanglang va koproq xato qiling",   // 20-30 yoshda
//     "ozingizga ishlashni boshlang",  // 30-40 yoshda
//     "siz kuchli bolgan narsalarni qiling",  // 40-50 yoshda
//     "yoshlarga investitsiya qiling",  // 50-60 yoshda
//     "endi dam oling, foydasi yoq endi kech",  // 60 yoshdan kn
// ];


// function maslahatBering(a, callback) {   // 2ta parametr  -> a (yosh nazarda tutlyapti!) hamda callback function
//     // krtlgan qiymat number bolmasa, xatolkni korsatsn
//     // calback -> 1-qism "error"             agar error mavjud bolmasa "null" qoyladi
//     // 2-qismga  -> qaytarmoqchi bolgan data               data mavjud bolmasa "null" yozladi
//     if (typeof a !== 'number') callback("Pls, insert number!", null);  // data mavjud bolmaganu un -> null(data un)
//     // aks holda: 20yoshgacha: 
//     // 1chi parametr "null" -> xatolik bolmagani uchun
//     // 2chi parametr qaytarladgan data -> list[0]: listimzni 0-indexdagi malumot
//     else if (a <= 20) callback(null, list[0]);
//     else if (a > 20 && a <= 30) callback(null, list[1]);  // 20dan katta VA 30dan kchk yoki teng
//     else if (a > 30 && a <= 40) callback(null, list[2]);  // argument sifatida berilgan -> call qsmga boradi (callback)
//     else if (a > 40 && a <= 50) callback(null, list[3]);
//     else if (a > 50 && a <= 60) callback(null, list[4]);
//     else {
//         // callback(null, list[5]);   -> setTimeout ishlamagan holatda

//         // CORE module -> setTimeout()  -> kechikb javob beradi
//         setTimeout(function () {   // 2ta parametr oladi
//             callback(null, list[5]);
//         }, 5000);  // 5sekundan kn javob beradi;   javob kelishini kutmay kngi log ishga tushadi, javob kelgan payti javob ni oladi
//         // ya'ni single thread ni band qlb qoymay: javob kelishini kutb turmay kngi log ga otb ketadi qachonki javob kelganda usha javobni oladi  
//     }
// }



// // func ichida 1-argument son, 2-arg (belglab olgan error va data)  -> ya'ni callback function
// // parametr sifatida function ishga tushadi
// maslahatBering(35, (err, data) => {  
//     if(err) console.log('ERROR:', err);  // agar xatolik bolsa usha xatolikni korsat (render) qlnadi
//     else console.log("javob:", data);  // xatolik bolmasa malumotni korsatadi
// })



// maslahatBering('salom', (err, data) => {     // 'salom'  -> error beradi va javobda null qiymat qaytaradi!
//     if(err) console.log('ERROR:', err); 
//     else {                                  // null qiymatni korsatmedi console da:  xatolik yoki togri javob ni ozi un ishlatiladi
//         console.log("javob:", data);   // error bolgan payti data ni oqimedi
//     }
// });


// setTimeout ni shu yerda ishlatb korish mn! (5sekunddan kn javob oladi)
// // ketma-ketlikda chqadi log lar  -> console da
// console.log('passed here 0');
// maslahatBering(61, (err, data) => {           // ?? why(60 va undan kick sonlar bolsa -> ketma-ketlikda chqadi) -> setTimoeout da ham
//     if(err) console.log('ERROR:', err); 
//     else {                                  
//         console.log("javob:", data);   
//     }
// });
// console.log('passed here 1');






// Asychronous function 

/*
hozirga qadar ishlatgan hamma functionlarimz synchronic func hisbdi -> srazi ishga tushadi srazi javob qaytadigan func
fs dan -> read, write func ishlatildi
// async func ichida CORE module lar ishlamedi
*/ 


// c
//         return onsole.log("Jack Ma maslahatlari");
// const list = [
//     "yaxshi talaba boling",   // 0-20 yoshda
//     "togri boshliq tanglang va koproq xato qiling",   // 20-30 yoshda
//     "ozingizga ishlashni boshlang",  // 30-40 yoshda
//     "siz kuchli bolgan narsalarni qiling",  // 40-50 yoshda
//     "yoshlarga investetsiya qiling",  // 50-60 yoshda
//     "endi dam oling, foydasi yoq endi kech",  // 60 yoshdan kn
// ];


// // defini qism  Async function
// async function maslahatBering(a) {     //  async  -> function define qlnadi
//     if (typeof a !== 'number') throw new Error("Pls, insert number!");    // error mavjud bolganda -> throw new Error  qachonki int typedagi qiymat kirtlmaganda
//     else if (a <= 20) return list[0];   // javob kelayotganda  faqat javobni ozini return qlaaamz
//     else if (a > 20 && a <= 30) return list[1]; // qiymatni return qladi
//     else if (a > 30 && a <= 40) return list[2];
//     else if (a > 40 && a <= 50) return list[3];
//     else if (a > 50 && a <= 60) return list[4];
//     else {list[5];
//     }
// };


    // Promise ni kuchli tarafi ichida setTimeout ishledi
//         return new Promise((resolve, reject) => {       // resolve = return;  reject = throw new Error
//             setTimeout(() =>   {
//                 resolve(list[5]);
//             }, 5000);  // 5 sekunddan kn javob keladi
//         });
//     }
// }

// // // setInterval orqali
//         return new Promise((resolve, reject) => {
//             setInterval(() => {   // bir marta javob oladi -> async function ln callback da qachon javob kelsa qayta-qayta oluradi
//                 resolve(list[5]);
//             }, 1000);    // 1sekunddan kn bitta javob oladi va toxtedi
//         });
//     }
// }

// async function run() {
//     let javob = await maslahatBering(65);
//     console.log(javob);
// }
// run();





// // CALL QISMI

// // 1chi ornda synch function ishga tushb bolgandan kn asynch func natijalari chqadi (log lar chqb bop, kn data yoki error chqadi)
// call via then/catch         hamda biz try/catch ishlatganmza yaxshiroq :)
// console.log("passed here 0");
// maslahatBering(25)
//     .then(data => {  // then -> data uchun     // a ni qiymati 25 ga teng
//     console.log('javob:', data);   // data kelganda malumot chqaradi   // xatolik bor payti ishga tushmedi
// })
//     .catch(err =>{                     // catch -> error uchun
//     console.log("ERROR:", err);   // error bolganda xatolikni korsatadi
// });     
// console.log("passed here 1");  



// //  30, 40, 50 yoshlarni soraganda then ichida berladi) promis heal yuzaga keladi pramida shaklida bu judayam noqulay
// console.log("passed here 0");
// maslahatBering(20)
//     .then(data => {  
//         maslahatBering(30)
//     .then(data => {  
//         maslahatBering(40)
//     .then(data => {  
//         maslahatBering(50)
//         .then(data => {  
//         console.log('javob:', data);   
//     })
//         .catch(err =>{                  
//         console.log("ERROR:", err);   
//     });     
//     console.log("passed here 1");
//     console.log('javob:', data);   
// })
//     .catch(err =>{                  
//     console.log("ERROR:", err);   
// });     
// console.log("passed here 1");
//     console.log('javob:', data);   
// })
//     .catch(err =>{                  
//     console.log("ERROR:", err);   
// });     
// console.log("passed here 1");
//     console.log('javob:', data);   
// })
//     .catch(err =>{                  
//     console.log("ERROR:", err);   
// });     
// console.log("passed here 1");  



// call via async/await -> sodda usul                heal dan qutlsh un yana async function ochladi      
// bu usulda log lar ketma-ket tarzda ishga tushadi (yoshlarni ketma-ketlikda chqaradi)
// async function run() {    // maydoncha yaratb bersh un xzmat qladi
//     let javob = await maslahatBering(25); // 1chi 20 yosh soraladi           // await -> kutadi
//     console.log(javob);    // javob qabul qlgandan kn log qlnadi
//     javob = await maslahatBering(31);  // javob qiymati ozgartb 31 berb soremz
//     console.log(javob);   // javob olgandan kn yana log qlnadi
//     javob = await maslahatBering(41);
//     console.log(javob);
// }
// run();   // run qlsn



// setTimeout orqali ishga tushganda: 5 sekundan kn ishga tushadi 1-chi log, kngi loglar srazi ketma-ketlikda ishga tushadi(5sekundni kutb turmedi qogan log lar:)
// async function run()  {
//     let javob1 = await maslahatBering(65);
//     console.log(javob1);
//     javob1 = await maslahatBering(31);
//     console.log(javob1);
//     javob1 = await maslahatBering(41);
//     console.log(javob1);
// }
// run();



// async function run()  {
//     let javob1 = await maslahatBering(25);   // srazi ishga tushadi
//     console.log(javob1);
//     javob1 = await maslahatBering(70); // 5 sekunddan kn ishga tushadi   (why??)
//     console.log(javob1);
//     javob1 = await maslahatBering(41);  // srazi ishga tushadi
//     console.log(javob1);
// }
// run();





// Calback function -> setInterval da ishlashi
// console.log("Jack Ma maslahatlari");
// const list = [
//     "yaxshi talaba boling",   // 0-20 yoshda
//     "togri boshliq tanglang va koproq xato qiling",   // 20-30 yoshda
//     "ozingizga ishlashni boshlang",  // 30-40 yoshda
//     "siz kuchli bolgan narsalarni qiling",  // 40-50 yoshda
//     "yoshlarga investetsiya qiling",  // 50-60 yoshda
//     "endi dam oling, foydasi yoq endi kech",  // 60 yoshdan kn
// ];



// function maslahatBering(a, calback) {
//     if (typeof a !== 'number') calback("insert a number", null);
//     else if (a <= 20) calback(null, list[0]);
//     else if (a > 20 && a <= 30) calback(null, list[1]);
//     else if (a > 30 && a <= 40) calback(null, list[2]);
//     else if (a > 40 && a <= 50) calback(null, list[3]);
//     else if (a > 50 && a <= 60) calback(null, list[4]);
//     else {
//         setInterval(function () {  // qachon javob qaytsa ketma-ket ishga tushuradi
//             calback(null, list[5]);
//         }, 1000);
//     }
// }

// console.log("passed here 0");
// maslahatBering(70, (err, data) => {
//     if (err) console.log("ERROR:", err);
//     else {
//         console.log(data);
//     }
// });
// console.log("passed here 1");



// async  => ketma-ketlik hamda source ni tiniq ishlashi un asynch function lardan foyd.di 
// Promise -> promiseAll -> arraylarni mapi bn ishlash uchun



// commit qlsh -> github ga
/*
1-> git status
2-> git add .
3-> git status
4-> git commit -m "feat: train callback hamda asyn functions"
5-> git status
6-> git log --oneline  // commit bolgan malumotni korsh uchun
*/


// Hometask

// A-TASK: 
// Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi letterni ikkinchi parametrdagi sozdan qatnashga sonini return qilishi kerak boladi.
// MASALAN countLetter("e", "engineer") 3ni return qiladi.

function letter(harf, soz) {  // letter nomli function 2 ta parametr oladi
    let sana = 0;             // harflarni sanash un boshlangch qiymat 0 db olnadi

    for (let char of soz) {   // soz dagi har bir harf ni tekshradi 
        if (char == harf) {   // agar har biz qdryotgan harf ga teng bolsa
            sana++;           // hisoblagchni 1 ga oshrb qoyamz
        }
    }
    return sana;              // natija qaytariladi
}
console.log(letter("e", "engineer"));      // function chqarlb olb berlgan parametr boyicha argument beramz
console.log(letter("i", "universitet"));