const speech = new SpeechSynthesisUtterance();
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
  172: "Pitchou",
};
const changeBadFrenchPronunciations = (pokemonNumber, pokemonName) => {
  if (pokemonNumber in goodFrenchPronunciation) {
    return goodFrenchPronunciation[pokemonNumber];
  }
  return pokemonName;
};

const buildSpeechName = (pokemonNumber, pokemonName) => {
  speech.text = changeBadFrenchPronunciations(pokemonNumber, pokemonName);
  speech.rate = 1;
  speech.volume = 1;
  speech.pitch = 1;
  speech.lang = "fr-FR";
};

const toggleSpeakIcon = () => {
  document.querySelector(".speak-icone").classList.toggle("hide");
};

const listenClickToSpeech = (setSpeaking) => {
  const notAlreadySpeaking = !window.speechSynthesis.speaking;
  if (notAlreadySpeaking) {
    window.speechSynthesis.speak(speech);
    setSpeaking(true);
    speech.onend = () => setSpeaking(false);
  }
};
const speak = (pokemonNumber, pokemonName, setSpeaking) => {
  buildSpeechName(pokemonNumber, pokemonName);
  listenClickToSpeech(setSpeaking);
};

export default speak;
