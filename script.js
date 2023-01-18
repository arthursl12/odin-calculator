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

