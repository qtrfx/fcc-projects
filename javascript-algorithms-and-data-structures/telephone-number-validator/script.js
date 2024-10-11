
const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultText = document.getElementById("results-div");

const telephoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([-\s])?(\d{3})([-\s]?)(\d{4})$/

const checkClick = () => {
  clearAll();
  if(!userInput.value) {
   alert("Please provide a phone number");
   return
  }

  validatePhoneNumber() 
    ? resultText.innerText = `Valid US number: ${userInput.value}` 
    : resultText.innerText = `Invalid US number: ${userInput.value}` 

}

const validatePhoneNumber = () => telephoneRegex.test(userInput.value)

const clearAll = () => {
  resultText.innerText = "";
}

clearButton.addEventListener("click", clearAll)
checkButton.addEventListener("click", checkClick)
userInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    checkClick();
  }
})
