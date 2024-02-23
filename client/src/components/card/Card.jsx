import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ pokemon }) => {
    return (
        <div className="Cards">
            <Link to={`/detail/${pokemon.id}`}>
                <h2>Datos del Pokémon:</h2>
                <img src={pokemon.image} alt={pokemon.name} className="CardImage" />
                <p>Nombre: {pokemon.name}</p>
                {pokemon.types && <p>Tipo: {pokemon.types.join(', ')}</p>} {/* Verificar si pokemon.types existe */}
            </Link>
        </div>
    );
}

export default Card;




