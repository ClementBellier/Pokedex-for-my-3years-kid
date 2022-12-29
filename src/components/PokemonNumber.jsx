const DisplayPokemonNumber = ({pokemonNumber}) =>{
    const numberToString = pokemonNumber.toString()
    const pad = "000"
    const pokemonNumberDisplay = pad.substring(0, pad.length - numberToString.length) + pokemonNumber
    return (<div id="pokemonNumber">{pokemonNumberDisplay}</div>)
}

export default DisplayPokemonNumber