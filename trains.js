console.log("train task ishga tushdi!");   // nodemon orqali ishga tushryapti (package json da berilishi shart!)

// E-TASK:  

// Shunday function tuzing, u bitta string argumentni qabul qilib osha stringni teskari qilib return qilsin.
// MASALAN: getReverse("hello") return qilsin "olleh"

function getReverse(string) {
  return string.split('').reverse().join('');
}

console.log(getReverse("hello"));
console.log(getReverse("mukhlisa"));









/* D-TASK:
Shunday function tuzing, u 2ta string parametrga ega bolsn hamda agar
har ikkala string bir xil harflardan iborat bolsa true, aks holda 
false qaytarsin. MASALAn checkContent("mitgroup", "gmtiprou")
return qiladi true



function checkContent(string1, string2) {
  if (string1.length !== string2.length){
    return false;
  }else if (string1.char != string2.char){
    return false;
  }else {
    return true;
  }
    
}

console.log(checkContent("mitgroup", "gmtiprou" ));  // true
console.log(checkContent("mukhlisa", "lisakh"));   // false
*/



/* MITASK-C 

// Shunday class tuzing tuzing nomi Shop, va uni constructoriga 3 hil mahsulot 
// pass bolsin, hamda classning 3ta methodi bolsin, biri qoldiq, biri sotish va biri qabul. 
// Har bir method ishga tushgan vaqt ham log qilinsin

/*MASALAN: const shop = new Shop(4, 5, 2); shop.qoldiq() return 
hozir 20:40da 4ta non, 5ta lagmon va 2ta cola mavjud! 
shop.sotish('non', 3) & shop.qabul('cola', 4) & shop.qoldiq() 
return hozir 20:50da 1ta non, 5ta lagmon va 6ta cola mavjud!


const moment = require("moment");
const time = moment().format("hh:mm")
// console.log(time);

class Shop {
  // constructor
  constructor(non, lagmon, cola) {
    this.non = non;
    this.lagmon = lagmon;
    this.cola = cola;
  }
  // Method
  qoldiq(){
    console.log(`Hozir ${time} da ${this.non} ta non, ${this.lagmon} ta lagmon, ${this.cola} ta cola mavjud`);
  }

  qabul(product, number){
    if(product === "cola"){
      this.cola += number;
    }else if(product === "lagmon"){
      this.lagmon += number;
    } else if(product === "non"){
      this.non += number;
    }
  }

  sotish(product, number){
    if(product === "cola"){
      this.cola -= number;
    }else if(product === "lagmon"){
      this.lagmon -= number;
    } else if(product === "non"){
      this.non -= number;
    }
  }

}

// const shop = new Shop(4, 5, 2); 
// shop.qoldiq();
// shop.sotish('non', 3);
// shop.qabul('cola', 4);

// // shop.sotish('lagmon', 3);
// // shop.sotish('non', 4);
// // shop.sotish("cola", 1);

// // shop.qabul("non", 5);
// // shop.qabul("lagmon", 2);
// // shop.qabul("cola", 7);

 shop.qoldiq();
*/



/* HomeTask =>  B-TASK: 

// Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan raqamlarni sonini bizga return qilsin.
// MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return qiladi.


// function countDigits(str) {
//     let count = 0;                     // Raqamlarni sanash un boshlangich qiymat => 0
//     for (let char of str) {            // Har bir belgini string ichidan tek
//         if (char >= '0' && char <= '9') {        // Agar belgi raqam bo'lsa... (0 va 9) orasida
//             count++;                // Raqamlarni birga oshrb ketiladi
//        }
//     }
//     return count;                   // Umumiy raqamlar sonini return qlamz
// }

// console.log(countDigits("ad2a54y79wet0sfgb9"));  // 7ta
// console.log(countDigits("mukhlisa0304"));  // 4ta
*/




/* 
 nodejs -> single thread(bir xonali)
bitta xona hamma userlarni requesti uchun yetarli
Yuborilgan request faqat usha xonada bolmedi, thread pool(kichkina xonalarga) yukledi
thread ga yordamchi thread pool mavjud
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



//         return onsole.log("Jack Ma maslahatlari");
// const list = [
//     "yaxshi talaba boling",   // 0-20 yoshda
//     "togri boshliq tanglang va koproq xato qiling",   // 20-30 yoshda
//     "ozingizga ishlashni boshlang",  // 30-40 yoshda
//     "siz kuchli bolgan narsalarni qiling",  // 40-50 yoshda
//     "yoshlarga investetsiya qiling",  // 50-60 yoshda
//     "endi dam oling, foydasi yoq endi kech",  // 60 yoshdan kn
// ];


// // defini qism  Async function  [asinkrenis]
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


// synchronous function -> srazi ishga tushadi javobi srazi qabul qladgan function



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

// javob olshda avval sync function oladi kn async func oqiladi
// workerlarda -> async ishledi; masterda esa -> sync ishledi



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



// Hometask

// A-TASK: 
// Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi letterni ikkinchi parametrdagi sozdan qatnashga sonini return qilishi kerak boladi.
// MASALAN countLetter("e", "engineer") 3ni return qiladi.

// function letter(harf, soz) {  // letter nomli function 2 ta parametr oladi
//     let sana = 0;             // harflarni sanash un boshlangch qiymat 0 db olnadi

//     for (let char of soz) {   // soz dagi har bir harf ni tekshradi 
//         if (char == harf) {   // agar har biz qdryotgan harf ga teng bolsa
//             sana++;           // hisoblagchni 1 ga oshrb qoyamz
//         }
//     }
//     return sana;              // natija qaytariladi
// }
// console.log(letter("e", "engineer"));      // function chqarlb olb berlgan parametr boyicha argument beramz
// console.log(letter("i", "universitet"));




/** ASYNCHRONOUS actions: callback, aysnc && Promise */
// CALLBACK functionlar
// AYSNC functionlar
// PROMISE functionlar

/* Define                         Call
   callback                      callback

async/await                 then/catch & aysnc/await
promise                     then/catch & async/await 
 
*/

// then/catch => bitta async mantiq bolganda ishatladi
// aysnc/await => bir nechta async mantiqlarni ketma-ket ishlatayotganda foydalaniladi (call) qismdi

// Define
// function qoldiqliBolish(a, b) {
//     const c = a % b;    // % qoldiqni qaytaradi
//     console.log("c:", c);
// }
// Call
// qoldiqliBolish(10,3);



//  callback functions 

// DEFINE
// function qoldiqBolish(a, b, callback) {
//     if (b === 0) { // b ni qiymati 0 ga teng bolb qolsa err yuzaga keladi
//       callback("Mahraj nolga teng bolmasin!", null, "ishlamaydi");  // error bolganda datamiz -> null boladi (ishlamadi dgan manoda)
//     } else {
//       const c = a % b;
//       callback(null, c, "ishladi");  // null-error bolmadi data boldi dgan manoda datani qiymati beriladi
//     }
//   }
  
//   // CALL   -> shu yerdan tahlilni boshlash kerak!
//   console.log("A");
//   qoldiqBolish(10, 3, (err, data, data2) => {   // qoldiqliBolish func ishga tushadi (10 va 3 qiymat beriladi): err yoki data chqishi ushbu ikkita qiymatga bogliq
//     if (err) {
//       console.log("ERROR:", err);
//       // console.log(data);
//     } else {
//       console.log("B");
//       console.log("data:", data);
//       console.log("data2:", data2);
//       // console.log("ANY LOGIC"); 
//     }
//   });
//   console.log("C");


  // callback -> ketma -ket darsda ishga tushadi yani (A, B, C) qisman async func hisb.di -> 5sekndan kn javob beradi

  // umumiy conceptsiyasi bor callback da avval error keladi kn data keladi!!










