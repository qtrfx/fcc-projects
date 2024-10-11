const pokeTable = document.getElementById("poke-table")
const spriteImg = document.getElementById("sprite")
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeTableTds = document.querySelectorAll("td");
const imgAmountDisp = document.getElementById("amount-display")
const frontBackToggleBtn = document.getElementById("front-back-toggle-button")
const shinyToggleBtn = document.getElementById("shiny-button")
const swapGenderBtn = document.getElementById("swap-gender-button")

let fbToggle = false;
let shinyToggle = false;
let genderToggle = false;
let pokeData;


const getPoke = async (pokeUrl) => {
  try {
    const res = await fetch(pokeUrl);
    const pokeData = await res.json();
    return pokeData
  }
  catch {
    return false
  }
}

const setTypes = ({types}) => {
  types.map(e => e.type.name).forEach(e => {
    document.getElementById("types").innerHTML += `<span>${e.toUpperCase()}</span>`
  })
}
const setNameAndId = ({name, id}) => {
  console.log(toString(id))
  document.getElementById("pokemon-name").innerText = name.toUpperCase();
  document.getElementById("pokemon-id").innerText = id.toString().toUpperCase();
}

const setStats = ({stats}) => {
  stats.forEach(stat => {
  })
}

const clearAll = () => {
  pokeTableTds.forEach(e => {
    e.innerText = ""
  })
  fbToggle = false;
  shinyToggle = false;
  genderToggle = false;
}

const setImg = ({sprites}) => {
  let imageKey = "";
  imageKey += fbToggle ? "back" : "front";
  imageKey += shinyToggle ? "_shiny" : "";
  imageKey += genderToggle 
    ? "_female" 
    : shinyToggle 
      ? ""
      : "_default"
  console.log(imageKey)

  spriteImg.src = sprites[imageKey]
  
}

const handleClick = async () => {
  const searchedPoke = searchInput.value.toLowerCase().split(/[.\s]+/).join("-")
  const searchUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchedPoke}`
  pokeData = await getPoke(searchUrl)
  if(!pokeData) {
    alert("Pokémon not found")
    return
  }
  else {
    clearAll();
    setNameAndId(pokeData)
    setTypes(pokeData)
    setStats(pokeData)
    setImg(pokeData)
  }

  

}

searchBtn.addEventListener("click", handleClick)
searchInput.addEventListener("keydown", (e) => {
  if(e.key == "Enter") {
    handleClick();
  }
})
frontBackToggleBtn.addEventListener("click", () => {
  fbToggle = !fbToggle;
  console.log("lol")
  setImg(pokeData);
})
shinyToggleBtn.addEventListener("click", () => {
  shinyToggle = !shinyToggle;
  console.log("lol")
  setImg(pokeData);
})
