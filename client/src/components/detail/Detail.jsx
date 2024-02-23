import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
                if (response.status === 200) {
                    const data = response.data;
                    setPokemonDetail(data);
                    setError(null);
                } else {
                    throw new Error('No se pudo obtener la información del Pokémon');
                }
            } catch (error) {
                console.error('Error al obtener información del Pokémon:', error);
                setPokemonDetail(null);
                setError(error.message);
            }
        };

        fetchPokemonDetail();
    }, [id]);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {pokemonDetail && (
                <div className="PokemonDetail">
                    <h2>Detalle del Pokémon</h2>
                    <p>ID: {pokemonDetail.id}</p>
                    <p>Nombre: {pokemonDetail.name}</p>
                    <img src={pokemonDetail.image} alt={pokemonDetail.name} />
                    <p>Vida: {pokemonDetail.health}</p>
                    <p>Ataque: {pokemonDetail.attack}</p>
                    <p>Defensa: {pokemonDetail.defense}</p>
                    {pokemonDetail.types && <p>Tipo: {pokemonDetail.types.join(', ')}</p>} {/* Verifica si pokemonDetail.types existe */}
                    {pokemonDetail.speed && <p>Velocidad: {pokemonDetail.speed}</p>}
                    {pokemonDetail.height && <p>Altura: {pokemonDetail.height}</p>}
                    {pokemonDetail.weight && <p>Peso: {pokemonDetail.weight}</p>}
                </div>
            )}
        </div>
    );
}

export default Detail;


