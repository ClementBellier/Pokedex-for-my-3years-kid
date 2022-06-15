const frame = document.querySelector('.frame')
const speech = new SpeechSynthesisUtterance()
const goodFrenchPronunciation = {
    16: "Roucoul",
    17: "Roucouppss",
    20: "Rattataque",
    21: "Pia fa bec",
    23: "A bo",
    24: "Arboque",
    25: "Pikatchou",
    26: "Raïtchou",
    29: "Nidoran Femelle",
    31: "Nidocouine",
    32: "Nidoran Male",
    37: "Goupixe",
    38: "Feu nard",
    41: "Nosférap ti",
    42: "Nosféral tot",
    45: "Rafflézia",
    46: "Parass",
    47: "Parassect",
    53: "Pèrssian",
    54: "Psyko koike",
    55: "A koi koike",
    56: "Férossinge",
    58: "Caninoss",
    63: "A bra",
    72: "Tentacoul",
    81: "Magné ti",
    84: "Do duo",
    88: "Ta de morve",
    89: "Gro ta de morve",
    90: "Kokiyass",
    92: "Fantominuss",
    95: "Oh nix",
    98: "Crabi",
    102: "neu neuf",
    106: "kick li",
    108: "Excélangue",
    112: "Rhinoféross",
    128: "Tauross",
    140: "Ka bu tot",
    141: "Kabutopss",
    150: "Miou Tout",
    151: "Miou",
}

const getPokemonSpecies = async (PokemonNumber) => 
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${PokemonNumber}/`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err));

const changePokemonImage = (pokemonUrl) => {
    const image = document.getElementById("pokemonImage")
    frame.removeChild(image)
    const newImage = document.createElement('img')
    newImage.setAttribute('src', pokemonUrl)
    newImage.id = "pokemonImage"
    frame.appendChild(newImage)
}
const changePokemonName = (pokemonName) => {
    document.getElementById("pokemonName").innerHTML = pokemonName
}
const changePokemonNumber = (pokemonNumber) => {
    const numberToString = pokemonNumber.toString()
    const pad = "000"
    const pokemonNumberDisplay = pad.substring(0, pad.length - numberToString.length) + pokemonNumber
    document.getElementById("pokemonNumber").innerHTML = pokemonNumberDisplay
}

const changePokemonBackground = (pokemonColorIndex) => {
    const colors = ['yellow','black','blue','brown','gray','green','pink','purple','red','white']
    frame.setAttribute("style",`background: radial-gradient(circle, white 0%, white 50%, var(--${colors[pokemonColorIndex]}1) 50%, var(--${colors[pokemonColorIndex]}2) 100%);background-size: 100% 200%;`)
}

const changePokemon = async (number) => {
    const pokemonData = await getPokemonSpecies(number)
    const pokemonName = pokemonData.names[4].name

    // retrieve color id in pokemonData.color.url + build url image to avoid new API calls
    const pokemonColorIndex = pokemonData.color.url[pokemonData.color.url.length - 2]
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${number}.svg`

    changePokemonBackground(pokemonColorIndex)
    changePokemonNumber(number)
    changePokemonName(pokemonName)
    changePokemonImage(pokemonImageUrl)

    return pokemonName
}

const changeBadFrenchPronunciations = (pokemonNumber, pokemonName) => {
    if(pokemonNumber in goodFrenchPronunciation){
        return goodFrenchPronunciation[pokemonNumber]
    }
    return pokemonName
}

const buildSpeechName = (pokemonNumber, pokemonName) => {
    speech.text = changeBadFrenchPronunciations(pokemonNumber, pokemonName)
    speech.rate = 1
    speech.volume = 1
    speech.pitch = 1
    speech.lang = "fr-FR"
}

const displaySpeakIcon = () => {
    document.querySelector(".speak-icone").classList.remove("hide")
}
const hideSpeakIcon = () => {
    document.querySelector(".speak-icone").classList.add("hide")
}

const listenClickToSpeech = () => {
    document.querySelector("#pokemonImage").addEventListener('click',()=>{
        const notAlreadySpeaking = !window.speechSynthesis.speaking
        if(notAlreadySpeaking) {
            window.speechSynthesis.speak(speech)
            displaySpeakIcon()
            speech.onend = () => hideSpeakIcon()
        }
    }) 
}

const pokemon = async (pokemonNumber) => {
    const pokemonName = await changePokemon(pokemonNumber)
    buildSpeechName(pokemonNumber, pokemonName)
    listenClickToSpeech()
}

const limitToPokemonFirstGen = (pokemonNumber) => {   
    if(pokemonNumber <= 0) pokemonNumber = 151
    if(pokemonNumber >= 152) pokemonNumber = 1
    
    return pokemonNumber
}

const listenChangeNumber = () => {
    let pokemonNumber = 1
    document.querySelector("#next").addEventListener('click', ()=>{
        pokemonNumber++;
        pokemonNumber = limitToPokemonFirstGen(pokemonNumber)
        pokemon(pokemonNumber)
    })
    document.querySelector("#previous").addEventListener('click', ()=>{
        pokemonNumber--;
        pokemonNumber = limitToPokemonFirstGen(pokemonNumber)
        pokemon(pokemonNumber)
    })
}

const main = () => {
    const startWithFirstPokemon = 1
    pokemon(startWithFirstPokemon)
    listenChangeNumber()
}

main()