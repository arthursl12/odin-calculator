let ENDOFNUMBER = false;
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
    // operator: null,
    firstOp: null,
    secondOp: null,
    previousText: ""
};


function appendInput(e){
    const n = e.target.textContent;
    if (n == "." && MEMORY.screen.includes(".")) { return; }
    if (n == "." && MEMORY.screen == "0") { MEMORY.screen == "0."; }
    else if (MEMORY.screen == "0") { MEMORY.screen = ""; }
    MEMORY.screen += n;
    updateScreen();

    // if (!ENDOFNUMBER){
    //     if (MEMORY.screen.length == 1 && MEMORY.screen == "0"){
    //         MEMORY.screen = String(n);
    //     }else{
    //         MEMORY.screen += String(n);
    //     }
        
    // }else{
    //     MEMORY.screen = String(n);
    //     ENDOFNUMBER = false;
    // }    
    // updateScreen();
}


function updateScreen(){
    const currOp = document.querySelector(".current-operation");
    currOp.textContent = MEMORY.screen;

    const prevOp = document.querySelector(".previous-operation");
    prevOp.textContent = MEMORY.previousText;
}




function inputOperator(e){
    if(!MEMORY.firstOp){
        // This operator is inputted after first number
        // Store first number and update screen
        MEMORY.firstOp = Number(MEMORY.screen);
        // MEMORY.screen = "";
    }else{
        // This operator is inputted after second number
        // Must compute and use the result as first number
        calculate();
    }

    const op = e.target.textContent;
    switch (op) {
        case "+":
            MEMORY.operator = add;
            ENDOFNUMBER = true;
            break;
        case "-":
            MEMORY.operator = sub;
            ENDOFNUMBER = true;
            break;
        case "x":
            MEMORY.operator = mul;
            ENDOFNUMBER = true;
            break;
        case "÷":
            MEMORY.operator = div;
            ENDOFNUMBER = true;
            break;
        default:
            console.log("Unknown operator");
            break;
    }

    

    updateScreen();
}

function calculate(){
    if (MEMORY.operator){
        MEMORY.secondOp = Number(MEMORY.screen);
        MEMORY.screen = "0";
        let result = operate(MEMORY.operator,MEMORY.firstOp, MEMORY.secondOp);
        MEMORY.firstOp = result;
        MEMORY.screen = String(result);
        MEMORY.secondOp = null;
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
            calculate();
            break;
        case "AC":
            MEMORY.screen = "0";
            MEMORY.operator = null;
            MEMORY.firstOp = null;
            MEMORY.secondOp = null;
            ENDOFNUMBER = false;
            break;
        case "←":
            if(MEMORY.screen.length > 1){
                MEMORY.screen = MEMORY.screen.slice(0,-1);
            }else{
                // == 1
                MEMORY.screen = "0";
            }
            console.log(`New screen: ${MEMORY.screen}`);
            break;
        default:
            console.log("Unknown meta operator");
            break;
    }
    updateScreen();
}

function inputUnary(e){
    const op = e.target.textContent;
    MEMORY.firstOp = Number(MEMORY.screen);
    switch (op) {
        case "√":
            MEMORY.operator = sqrt;
            calculateUnary();
            ENDOFNUMBER = true;
            break;
        case ".":
            console.log("POINT");
            // MEMORY.operator = add;
            break;
        case "±":
            MEMORY.operator = flip;
            calculateUnary();
            // calculate();
            // ENDOFNUMBER = true;
            break;
    }
    updateScreen();
    MEMORY.firstOp = null;
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