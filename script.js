function add(a,b){ return a+b; }
function sub(a,b){ return a-b; }
function mul(a,b){ return a*b; }
function div(a,b){ if(b!=0){ return a/b; }else{ return "DIV"; }}

function operate(op,a,b){
    return op(a,b);
}



console.log(add(5,3));
console.log(sub(5,3));
console.log(mul(5,3));
console.log(div(5,3));
console.log(div(5,0));

console.log(operate(add,5,3));
console.log(operate(sub,5,3));
console.log(operate(mul,5,3));
console.log(operate(div,5,3));
console.log(operate(div,5,0));

const MEMORY = {
    screen: "",
    operator: null,
    firstOp: null,
    secondOp: null
};

function placeDigit(e){
    const n = Number(e.target.textContent);

    MEMORY.screen += String(n);
    console.log();
    updateScreen();
}

function updateScreen(){
    const scr = document.querySelector(".screen");
    scr.textContent = MEMORY.screen;
}

function addEventDigit(){
    const keys = document.querySelectorAll(".number");
    keys.forEach(key => key.addEventListener('click',placeDigit));
}

addEventDigit();
