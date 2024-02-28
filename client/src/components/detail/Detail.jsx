import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from './detail.module.css';

const Detail = () => {
    const { id } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState(null);
    const [pokemonType, setPokemonType] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
                console.log(response)
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

    useEffect(() => {
        if (pokemonDetail) {
            const fetchPokemonType = async () => {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonDetail.name}`);
                    if (response.status === 200) {
                        const types = response.data.types.map(type => type.type.name);
                        setPokemonType(types.join(', '));
                    } else {
                        throw new Error('Error fetching Pokemon type');
                    }
                } catch (error) {
                    console.error('Error fetching Pokemon type:', error);
                }
            };

            fetchPokemonType();
        }
    }, [pokemonDetail]);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.detailContainer}>
                {error && <p>Error: {error}</p>}
                {pokemonDetail && (
                    <div className={styles.detailContent}>
                        <h2>Detalle del Pokémon</h2>
                        <p>ID: {pokemonDetail.id}</p>
                        <p>Nombre: {pokemonDetail.name}</p>
                        <img src={pokemonDetail.image} alt={pokemonDetail.name} />
                        <p>Vida: {pokemonDetail.health}</p>
                        <p>Ataque: {pokemonDetail.attack}</p>
                        <p>Defensa: {pokemonDetail.defense}</p>
                        {pokemonType && <p>Tipo: {pokemonType}</p>}
                        {pokemonDetail.speed && <p>Velocidad: {pokemonDetail.speed}</p>}
                        {pokemonDetail.height && <p>Altura: {pokemonDetail.height}</p>}
                        {pokemonDetail.weight && <p>Peso: {pokemonDetail.weight}</p>}
                    </div>
                )}
                <div className={styles.buttonContainer}>
                    <Link to="/home" className={styles.button}>Volver a la página principal</Link>
                </div>
            </div>
        </div>
    );
}

export default Detail;




