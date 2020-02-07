const result = document.querySelector('#result');
const calc = document.querySelector('#calculation');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('#decimal');
const del = document.querySelector('#delete');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const plusMinus = document.querySelector('#plusMinus');

let calculation = [];
let equalsPressed = false;

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    if(result.textContent === "0" || equalsPressed === true) {
      result.textContent = number.innerHTML;
      equalsPressed = false;
    } else {
      result.textContent += number.innerHTML;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    calculation.push(result.textContent);
    calculation.push(operator.innerHTML);

    result.textContent = "0";
    calc.textContent = calculation.join(" ");
  });
});

decimal.addEventListener('click', () => {
  if(result.textContent.includes(".") || equalsPressed === true) { /*prevents multiple decimals, and adding decimal to result*/
    return;
  } else {
    result.textContent += decimal.innerHTML;
  };
});

del.addEventListener('click', () => {
  if(result.textContent.length === 1) {
    result.textContent = "0";
  } else{
    let str = result.textContent;
    let newStr = str.slice(0, -1);

    result.textContent = newStr;
  };
});

clear.addEventListener('click', () => {
  calculation = [];
  calc.textContent = "";
  result.textContent = "0";
});

plusMinus.addEventListener('click', () => {
  result.textContent = result.textContent * -1;
});

equals.addEventListener('click', () => {
  equalsPressed = true;
  if(calculation.length === 0) { /*Prevents equals click before calculation*/
    return;
  } else{
    calculation.push(result.textContent);
    calculation.push("=");

    result.textContent = "0";
    calc.textContent = calculation.join(" ");
    console.log(calculation);

    convertToNumbers(calculation);

    console.log(calculation);

    /*Check for multiply and divide first*/
    for(let i = 0; i < calculation.length; i++) {
      if(calculation[i] === "x" || calculation[i] === "÷") {
        calculation.splice(i-1, 3, (operate(calculation[i-1], calculation[i+1], calculation[i])));
        i -= 1;
      };
    };

    console.log(calculation);

    /*Then addition and subtraction*/
    for(let i = 0; i < calculation.length; i++) {
      if(calculation[i] === "+" || calculation[i] === "-") {
        calculation.splice(i-1, 3, (operate(calculation[i-1], calculation[i+1], calculation[i])));
        i -= 1;
      };
    };

    console.log(calculation);

    result.textContent = calculation[0];

    /*Reset calculation array*/
    calculation = [];
  };

});

/*Convert every other array element to a number*/
function convertToNumbers(array) {
  for(let i = 0; i < array.length; i += 2) {
    array[i] = Number(array[i]);
  };
};

function operate(a, b, operator) {
  switch(operator) {
    case "x":
      return a * b;
      break;
    case "÷":
      return a / b;
      break;
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
  };
};
