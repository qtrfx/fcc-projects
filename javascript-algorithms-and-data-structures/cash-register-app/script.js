let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashValue = [
  ["PENNY", 0.01, 0],
  ["NICKEL", 0.05, 0],
  ["DIME", 0.1, 0],
  ["QUARTER", 0.25, 0],
  ["ONE", 1, 0],
  ["FIVE", 5, 0],
  ["TEN", 10, 0],
  ["TWENTY", 20, 0],
  ["ONE HUNDRED", 100, 0]
  ]


const cashInput = document.getElementById("cash")
const purchaseBtn = document.getElementById("purchase-btn")
const changeDueOutput = document.getElementById("change-due");
let composedString = ``;

const round2Dec = number => Math.round(Number(number) * 100) / 100;

const clearAll = () => {
  composedString = ``;
  changeDueOutput.innerText = ``;
}

const getCidSum = cidArr => cidArr.map(e => e[1]).reduce((acc, e) => acc + e)

const calcChange = cash => {
  let tempCash = cash;
  const tempCid = JSON.parse(JSON.stringify(cid))
  const tempCashVal = JSON.parse(JSON.stringify(cashValue))
  console.log(tempCashVal)
  for(let cidIndex = 8; cidIndex >= 0; cidIndex --) {
    
    while(tempCash >= cashValue[cidIndex][1] && tempCid[cidIndex][1] > 0) {

      tempCash = round2Dec(tempCash - tempCashVal[cidIndex][1]);
      tempCid[cidIndex][1] = round2Dec(tempCid[cidIndex][1] - tempCashVal[cidIndex][1]);
      tempCashVal[cidIndex][2] = round2Dec(tempCashVal[cidIndex][2] + tempCashVal[cidIndex][1])

    }

  }

  if(tempCash == 0) {
    composedString += `${tempCashVal
    .filter(e => e[2] > 0)
    .reverse()
    .map(e => `${e[0]}: $${e[2]}`)
    .join(" ")}`
    getCidSum(tempCid) == 0 
      ? composedString = `Status: CLOSED ` + composedString
      : composedString = `Status: OPEN ` + composedString
    cid = tempCid;
  }
  else {
    composedString = `Status: INSUFFICIENT_FUNDS`
  }


}

const handleEvent = () => {
  const changeNeeded = round2Dec(parseFloat(cashInput.value) - parseFloat(price))
  const totalCid = round2Dec(getCidSum(cid))

  clearAll();
  if(changeNeeded == 0) {
    composedString = `No change due - customer paid with exact cash`
  }
  else if(changeNeeded < 0) {
    alert(`Customer does not have enough money to purchase the item`)
    return;
  }
  else if(changeNeeded > totalCid) {
    composedString = `Status: INSUFFICIENT_FUNDS`
  }
  else {
    calcChange(changeNeeded)
  }

  changeDueOutput.innerText = composedString;
}


// Add event listeners for button click & enter/return on input field
purchaseBtn.addEventListener("click", handleEvent)
cashInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    handleEvent();
  }
})
