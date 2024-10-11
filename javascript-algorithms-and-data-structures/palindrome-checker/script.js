const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultText = document.getElementById("result");


resultText.innerText = "gaming";


const checkPalindrome = () => {
  resultText.innerText = "";
  if (!textInput.value) {
    alert("Please input a value")
    return
  };
  
  const cleanedInput = textInput.value.split("").filter(e => /[a-z0-9]/i.test(e)).join("").toLowerCase();
  const reversedInput = [];
  for (const letter of cleanedInput) {
    reversedInput.unshift(letter);

  }
  if (cleanedInput === reversedInput.join("")) {
    resultText.innerText = `${textInput.value} is a palindrome`;
  }
  else {
    resultText.innerText = `${textInput.value} is not a palindrome`
  }

}



checkButton.addEventListener("click", checkPalindrome)
