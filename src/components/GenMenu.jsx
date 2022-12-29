import { useState } from "react";

const generations = ["candy-cane", 1, 2, 3, 4, 5, 6, 7, 8];

const GenMenu = ({ pokeGen, setPokeGen }) => {
  const [isMenuActive, setMenuActive] = useState(false);
  const icone = generations[pokeGen];
  return (
    <>
      <div className="icone gen-menu-choise" onClick={setMenuActive}>
        <i className={`fa-solid fa-${icone}`}></i>
      </div>
      <div className={isMenuActive ? "gen-menu active" : "gen-menu"}>
        {generations.map((gen, index) => (
          <div
            key={`gen-${index}`}
            onClick={() => {
              setPokeGen(index);
              setMenuActive(!isMenuActive);
            }}
          >
            <i className={`fa-solid fa-${gen}`}></i>
          </div>
        ))}
      </div>
    </>
  );
};
export default GenMenu;
