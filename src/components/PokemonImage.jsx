const PokemonImage = ({pokemonNumber, pokemonName}) => {
    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`
    if(pokemonNumber >= 650) imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`

    return <img src={imageUrl} alt={`Illustration de ${pokemonName}`} id="pokemonImage" />
}
export default PokemonImage