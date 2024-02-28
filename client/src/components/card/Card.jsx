import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './card.module.css';

const Card = ({ pokemon }) => {
    const [pokemonType, setPokemonType] = useState(null);

    useEffect(() => {
        const fetchPokemonType = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
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
    }, [pokemon.name]);

    return (
        <div className={styles.card}>
            <Link to={`/detail/${pokemon.id}`} className={styles.link}>
                <img className={styles.cardImage} src={pokemon.image} alt={pokemon.name} />
                <p className={styles.cardName}>{pokemon.name}</p>
                {pokemonType && <p>Tipo: {pokemonType}</p>}
            </Link>
        </div>
    );
}

export default Card;






