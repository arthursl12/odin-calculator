let ENDOFNUMBER = false;
let NEXT_RESET = false;
let MAXCHARS = 13;

function add(a,b){ return a+b; }
function sub(a,b){ return a-b; }
function mul(a,b){ return a*b; }
function div(a,b){ if(b!=0){ return a/b; }else{ return "DIV"; }}
function flip(a,b){ return -1*a; }
function sqrt(a,b){ if(a>=0){ return Math.sqrt(a); } }
function operate(op,a,b){
    return op(a,b);
}

const MEMORY = {
    screen: "0",
    op: null,
    firstOp: null,
    secondOp: null,
    previousText: ""
};


function appendInput(e){
    const n = e.target.textContent;
    if (n == "." && MEMORY.screen == "0") { MEMORY.screen == "0."; NEXT_RESET = false; }
    else if (n == "." && MEMORY.screen.includes(".")) { return; }
    else if (NEXT_RESET) { MEMORY.screen = ""; NEXT_RESET = false; }
    else if (MEMORY.screen == "0") { MEMORY.screen = ""; }
    MEMORY.screen += n;
    updateScreen();
}


function updateScreen(){
    const currOp = document.querySelector(".current-operation");
    currOp.textContent = MEMORY.screen;

    const prevOp = document.querySelector(".previous-operation");
    prevOp.textContent = MEMORY.previousText;
}

function inputOperator(e){
    const op = e.target.textContent;
    if(!MEMORY.previousText){
        MEMORY.firstOp = MEMORY.screen;
    }else{
        equalsOperation();
    }
    MEMORY.previousText = `${MEMORY.firstOp} ${op}`;
    MEMORY.op = getOperatorFunction(op);
    MEMORY.screen = "";
    updateScreen();
}

function equalsOperation(){
    if (!MEMORY.op){ return; }
    let secondNumber = MEMORY.screen;

    // Do calculation
    let result = operate(
        MEMORY.op, 
        Number(MEMORY.firstOp), 
        Number(secondNumber))

    // Store next and update stored result
    MEMORY.firstOp = result;
}

function getOperatorFunction(op_str){
    switch (op_str) {
        case "+": return add;
        case "-": return sub;
        case "x": return mul;
        case "÷": return div;
        default: console.log("Unknown operator"); return "";
    }
}



function calculateUnary(){
    MEMORY.screen = "0";
    let result = operate(MEMORY.operator,MEMORY.firstOp, MEMORY.secondOp);
    MEMORY.firstOp = null;
    MEMORY.screen = String(result);
    MEMORY.secondOp = null;
}

function inputMeta(e){
    const op = e.target.textContent;
    switch (op) {
        case "=":
            if (!MEMORY.op) { break; }
            equalsOperation();
            MEMORY.screen = String(MEMORY.firstOp);
            MEMORY.firstOp = "";
            MEMORY.previousText = "";
            NEXT_RESET = true;
            break;
        case "AC":
            MEMORY.previousText = "";
            MEMORY.screen = "0";
            MEMORY.op = null;
            MEMORY.firstOp = null;
            MEMORY.secondOp = null;
            break;
        case "←":
            if (NEXT_RESET){
                // Press backspace after a '='
                MEMORY.screen = "0";
            }else if(MEMORY.screen.length > 1){
                MEMORY.screen = MEMORY.screen.slice(0,-1);
            }else{
                // == 1
                MEMORY.screen = "0";
            }
            break;
        default:
            console.log("Unknown meta operator");
            break;
    }
    updateScreen();
}

function inputUnary(e){
    const op = e.target.textContent;
    // MEMORY.firstOp = Number(MEMORY.screen);
    switch (op) {
        case "√":
            MEMORY.screen = String(sqrt(Number(MEMORY.screen),0));
            break;
        case "±":
            MEMORY.screen = String(flip(Number(MEMORY.screen),0));
            break;
    }
    updateScreen();
    // MEMORY.firstOp = null;
}








function addEventDigit(){
    const keys = document.querySelectorAll(".number");
    keys.forEach(key => key.addEventListener('click',appendInput));
}
function addEventOperator(){
    const keys = document.querySelectorAll(".operator");
    keys.forEach(key => key.addEventListener('click',inputOperator));
}
function addEventMeta(){
    const metaKeys = document.querySelectorAll(".meta");
    metaKeys.forEach(key => key.addEventListener('click',inputMeta))
}
function addEventUnary(){
    const unary = document.querySelectorAll(".unary");
    unary.forEach(key => key.addEventListener('click',inputUnary))
}
addEventDigit();
addEventOperator();
addEventMeta();
addEventUnary();