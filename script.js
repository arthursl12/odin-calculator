function add(a,b){ return a+b; }
function sub(a,b){ return a-b; }
function mul(a,b){ return a*b; }
function div(a,b){ if(b!=0){ return a/b; }else{ return "DIV"; }}

function operate(op,a,b){
    return op(a,b);
}

const MEMORY = {
    screen: "0",
    operator: null,
    firstOp: null,
    secondOp: null
};

let ENDOFNUMBER = false;
function placeDigit(e){
    const n = Number(e.target.textContent);

    if (!ENDOFNUMBER){
        if (MEMORY.screen.length == 1 && MEMORY.screen == "0"){
            MEMORY.screen = String(n);
        }else{
            MEMORY.screen += String(n);
        }
        
    }else{
        MEMORY.screen = String(n);
        ENDOFNUMBER = false;
    }    
    updateScreen();
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
        case "√":
            console.log("SQRT");
            // MEMORY.operator = add;
            break;
        case ".":
            console.log("POINT");
            // MEMORY.operator = add;
            break;
        case "±":
            console.log("SIGNAL");
            // MEMORY.operator = add;
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


function updateScreen(){
    const scr = document.querySelector(".screen");
    scr.textContent = MEMORY.screen;
}






function addEventDigit(){
    const keys = document.querySelectorAll(".number");
    keys.forEach(key => key.addEventListener('click',placeDigit));
}

function addEventOperator(){
    const keys = document.querySelectorAll(".operator");
    keys.forEach(key => key.addEventListener('click',inputOperator));
}

function addEventMeta(){
    const metaKeys = document.querySelectorAll(".meta");
    metaKeys.forEach(key => key.addEventListener('click',inputMeta))
}

addEventDigit();
addEventOperator();
addEventMeta();