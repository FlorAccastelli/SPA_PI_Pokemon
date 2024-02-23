import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../cards/Cards'; // Importar el componente Cards
import Detail from '../detail/Detail'; // Importar el componente Detail
import './HomePage.css';

export default function HomePage() {
    const [name, setName] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false); // Estado para controlar si los datos ya han sido cargados
    const [showDetail, setShowDetail] = useState(false); // Estado para controlar si se muestra el detalle del Pokémon

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const search = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/pokemons/find?name=${name}`);
            if (response.status === 200) {
                const data = response.data;
                setPokemonData(Array.isArray(data) ? data : [data]);
                setError(null); 
            } else {
                throw new Error('No se pudo obtener la información del Pokémon');
            }
        } catch (error) {
            console.error('Error al obtener información del Pokémon:', error);
            setPokemonData([]); 
            setError('Ocurrió un error al buscar el Pokémon. Por favor, inténtalo de nuevo más tarde.'); 
        } finally {
            setName("");
            setShowDetail(true); //? Asegurarse de que el detalle no se muestre al realizar una búsqueda
        }
    };

    useEffect(()=> {
        if (!loaded) { // Solo cargar datos si no se han cargado previamente
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/pokemons');
                    if (response.status === 200) {
                        const data = response.data;
                        setPokemonData(data); 
                        setError(null); 
                        setLoaded(true); // Marcar que los datos han sido cargados
                    } else {
                        throw new Error('No se pudo obtener la información de los Pokémon');
                    }
                } catch(error){
                    console.error('Error al obtener información de los Pokémon:', error);
                    setPokemonData([]); 
                    setError(error.message); 
                } 
            };

            fetchData();
        }
    }, [loaded]); // Ejecutar solo cuando el estado 'loaded' cambie

    const handleDetailClick = () => {
        setShowDetail(true); // Mostrar el detalle cuando se haga clic en una carta
    };

    return (
        <div>
            <h1>Home Page</h1>
            <input type='search' value={name} onChange={handleChange} placeholder="Ingresa el nombre de un Pokemon"/>
            <button onClick={search}>Buscar por nombre</button>
            {error && <p>Error: {error}</p>}
            {showDetail && pokemonData.length === 1 && <Detail pokemon={pokemonData[0]} />} {/* Mostrar el detalle solo si hay un Pokémon */}
            <Cards pokemonData={pokemonData} onCardClick={handleDetailClick} /> {/* Renderizar el componente Cards y pasar pokemonData como prop */}
        </div>
    );
}

