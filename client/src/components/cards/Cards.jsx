import React from 'react';
import Card from '../card/Card';
import styles from './cards.module.css';

const Cards = ({ pokemonData, showFullInfo }) => {
    return (
        <div className={styles.cardContainer}>
            {pokemonData.map((pokemon, index) => (
                <div key={index} className={styles.card}>
                <Card pokemon={pokemon} showFullInfo={showFullInfo} /> 
            </div>
            ))}
        </div>
    );
}

export default Cards;




