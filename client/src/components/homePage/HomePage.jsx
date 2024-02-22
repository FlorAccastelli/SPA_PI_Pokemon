import React, { useState } from 'react';
import axios from 'axios';

function Cards() {
    



        const response = axios.get(`http://localhost:3001/pokemons/find?name=pikachu`).then(
            console.log(response);
            const listado = [{id: 1, name: "Pikachu"}]
            const listaCartas = response().data.map(card =>
                <li key={card.id}>
                  {card.name}
                </li>
              )
        );

        
    return(
        <ul>
            {listaCartas}
        </ul>
       
    )
};
export default function HomePage() {

    const [cardsLista, setCardsLista] = useState();

    function handleClick() {
        setCardsLista( Cards() );
    }

    return (
        <div>
            <h1>Home Page</h1>
            <input type='search' placeholder="Ingresa el nombre de un Pokemon"/>
            <button onClick={handleClick}>Buscar por nombre</button>

                {cardsLista}
        </div>
    );
}