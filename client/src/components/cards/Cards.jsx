import React from 'react';
import Card from '../card/Card'; // Importar el componente Card

const Cards = ({ pokemonData, showFullInfo }) => {
    return (
        <div>
            <h2>Datos de los Pokémon:</h2>
            {pokemonData.map((pokemon, index) => (
                <Card key={index} pokemon={pokemon} showFullInfo={showFullInfo} /> 
            ))}
        </div>
    );
}

export default Cards;



