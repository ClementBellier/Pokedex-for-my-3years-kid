import { useEffect, useState } from "react";
import GenMenu from "./components/GenMenu";
import PokemonImage from "./components/PokemonImage";
import DisplayPokemonNumber from "./components/PokemonNumber";
import SpeakIcon from "./components/SpeakIcon";
import speak from "./function/speak";
import { AdventCalendarPokemon, limitByGeneration } from "./AdventPokemonList";
import PokeMenu from "./components/PokeMenu";

const limitToPokemonGen = (pokemonNumber, pokeGen) => {
  const min = limitByGeneration[pokeGen].min
  const max = limitByGeneration[pokeGen].max
  if (pokemonNumber < min) pokemonNumber = max;
  if (pokemonNumber > max) pokemonNumber = min;

  return pokemonNumber;
};

const changePokemonNumber = (pokeGen, pokemonNumber, minus) => {
  if(pokeGen === 0) {
    const index = AdventCalendarPokemon.indexOf(pokemonNumber)
    if(index === -1 || (index+1 === AdventCalendarPokemon.length && !minus)) return AdventCalendarPokemon[0]
    if(minus && index-1 <0) return AdventCalendarPokemon[AdventCalendarPokemon.length - 1]
    if(minus) return AdventCalendarPokemon[index - 1]
    return AdventCalendarPokemon[index + 1]
  }
  if(minus) return limitToPokemonGen(pokemonNumber-1,pokeGen)
  return limitToPokemonGen(pokemonNumber + 1, pokeGen)
}

const App = () => {
  const [pokeGen, setPokeGen] = useState(1);
  const firstPokemonByGen = pokeGen === 0 ? AdventCalendarPokemon[0] : limitByGeneration[pokeGen].min
  const [pokemonNumber, setPokemonNumber] = useState(firstPokemonByGen);
  const [pokemonData, setPokemonData] = useState({});
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isSpeaking, setSpeaking] = useState(false);
  useEffect(()=>{
    setPokemonNumber(firstPokemonByGen)
  },[pokeGen])
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}/`
        );
        if (!response.ok) setError(true);
        const data = await response.json();
        setPokemonData(data);
        setLoading(false);
      } catch {
        setError(true);
      }
    };
    fetchPokemon();
  }, [pokemonNumber]);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Erreur</div>;
  const pokemonName = pokemonData.names[4].name;
  return (
    <>
      <GenMenu pokeGen={pokeGen} setPokeGen={setPokeGen} />
      <PokeMenu pokeGen={pokeGen} setPokemonNumber={setPokemonNumber} />
      {isSpeaking && <SpeakIcon />}
      <PokemonImage
        pokemonNumber={pokemonNumber}
        pokemonName={pokemonName}
        onClick={() => console.log("click")}
      />
      <div
        className="click-box"
        onClick={() => speak(pokemonNumber, pokemonName, setSpeaking)}
      ></div>
      <div className="name">
        <div
          className="previous"
          id="previous"
          onClick={() => {
            const minus = true
            setPokemonNumber(changePokemonNumber(pokeGen, pokemonNumber, minus ));
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="pokemonId">
          <DisplayPokemonNumber pokemonNumber={pokemonNumber} />
          <div id="pokemonName">{pokemonName}</div>
        </div>
        <div
          className="next"
          id="next"
          onClick={() => {
            const minus = false
            setPokemonNumber(changePokemonNumber(pokeGen, pokemonNumber, minus ));
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </>
  );
};

export default App;
