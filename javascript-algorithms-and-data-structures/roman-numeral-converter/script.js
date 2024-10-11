const numberInput = document.getElementById("number");
const checkButton = document.getElementById("convert-btn");
const outputText = document.getElementById("output");
const romanToArabicDict = [
  {roman: "M", arabic: 1000},
  {roman: "CM", arabic: 900},
  {roman: "D", arabic: 500},
  {roman: "CD", arabic: 400},
  {roman: "C", arabic: 100},
  {roman: "XC", arabic: 90},
  {roman: "L", arabic: 50},
  {roman: "XL", arabic: 40},
  {roman: "X", arabic: 10},
  {roman: "IX", arabic: 9},
  {roman: "V", arabic: 5},
  {roman: "IV", arabic: 4},
  {roman: "I", arabic: 1}]
let resultString = "";

const reset = () => {
  output.innerText = "";
  resultString = "";
  numberInput.value = "";
}

const buttonClickRoman = () => {
  

  const numValue = numberInput.value;
  reset()
  if (!numValue) {
    outputText.innerText = "Please enter a valid number"
    return
  }
  if (numValue <= 0) {
    outputText.innerText = "Please enter a number greater than or equal to 1"
    return
  }
  else if (numValue >= 4000) {
    outputText.innerText = "Please enter a number less than or equal to 3999";
    return
  }
  else {
    convertToRoman(numValue, 0)
    outputText.innerText = resultString;
  }

}
const convertToRoman = (number, romanIndex) => {
  if (number <= 0) {
    return
  }
  const currentDict = romanToArabicDict[romanIndex]
  numberInput.innerText = currentDict;
  if (number >= currentDict.arabic) {
     number -= currentDict.arabic;
    resultString += currentDict.roman;
    convertToRoman(number, romanIndex);
  }
  else {
    convertToRoman(number, romanIndex + 1)
  }
}

checkButton.addEventListener("click", buttonClickRoman);

numberInput.addEventListener("keydown", (e) => {
  if(e.key == "Enter") {
    buttonClickRoman()
  }
})
