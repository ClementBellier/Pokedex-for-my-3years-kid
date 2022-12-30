import { useState } from "react";
import { AdventCalendarPokemon, limitByGeneration } from "../AdventPokemonList";

const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

const setPokemonInMenu = (pokeGen) => {
    if(pokeGen === 0) return AdventCalendarPokemon
    return range(
    limitByGeneration[pokeGen].min,
    limitByGeneration[pokeGen].max
  );
}

const PokeMenu = ({ pokeGen, setPokemonNumber }) => {
  const pokemonInMenu = setPokemonInMenu(pokeGen)
  const [isMenuActive, setMenuActive] = useState(false);
  return (
    <>
      <div className="icone pokemon-menu-icone" onClick={setMenuActive}>
        <i className="fa-solid fa-bars"></i>
      </div>
      {isMenuActive && (
        <div className="pokemon-menu">
          {pokemonInMenu.map((pokemon) => (
            <div
              key={pokemon}
              onClick={() => {
                setMenuActive(false);
                setPokemonNumber(pokemon);
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default PokeMenu;
