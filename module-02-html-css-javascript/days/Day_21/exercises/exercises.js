// 1
const button=document.querySelector("#theme-toggle");
const savedTheme=localStorage.getItem("theme");
if(savedTheme==="dark") document.body.classList.add("dark");
button.addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");});

// 2
function save(data){localStorage.setItem("signups",JSON.stringify(data));}
function load(){try{return JSON.parse(localStorage.getItem("signups"))||[];}catch{return [];}}

// 3
const form=document.querySelector("#signup-form");
const nameInput=document.querySelector("#name");
const phoneInput=document.querySelector("#phone");
const error=document.querySelector("#error");
const count=document.querySelector("#count");

// 4
const phoneRegex=/^09\d{8}$/;
form.addEventListener("submit",e=>{e.preventDefault();const name=nameInput.value.trim(),phone=phoneInput.value.trim();

// 5
error.textContent="";
if(name.length<2){error.textContent="Name must be at least 2 characters.";return;}
if(!phoneRegex.test(phone)){error.textContent="Enter a valid Ethiopian phone number.";return;}

// 6
let signups=load();
signups.push({name,phone});
save(signups);
form.reset();
count.textContent=`${signups.length} people have signed up.`;
});
count.textContent=`${load().length} people have signed up.`;




