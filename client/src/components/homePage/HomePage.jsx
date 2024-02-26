import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { filterByType, filterByOrigin } from '../../redux/actions';
import Cards from '../cards/Cards'; // Importar el componente Cards
import Detail from '../detail/Detail'; // Importar el componente Detail
import Form from '../formPage/FormPage'; // Importar el componente Form
import styles from './HomePage.module.css';

const POKEMONS_PER_PAGE = 12;

const HomePage = ({ filterByType, filterByOrigin, typeFilter, originFilter }) => {
    const [name, setName] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false); // Estado para controlar si los datos ya han sido cargados
    const [showDetail, setShowDetail] = useState(false); // Estado para controlar si se muestra el detalle del Pokémon
    const [showForm, setShowForm] = useState(false); // Estado para controlar si se muestra el formulario
    const [selectedType, setSelectedType] = useState(''); // Estado para almacenar el tipo seleccionado
    const [selectedOrigin, setSelectedOrigin] = useState(''); // Estado para almacenar el origen seleccionado
    const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual

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
                        let data = response.data;
                        if (typeFilter) {
                            data = data.filter(pokemon => pokemon.type === typeFilter);
                        }
                        if (originFilter) {
                            data = data.filter(pokemon => pokemon.origin === originFilter);
                        }
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
    }, [loaded, typeFilter, originFilter]); // Ejecutar solo cuando el estado 'loaded' cambie

    const handleDetailClick = () => {
        setShowDetail(true); // Mostrar el detalle cuando se haga clic en una carta
    };

    const handleFormClick = () => {
        setShowForm(true); // Mostrar el formulario cuando se haga clic en el botón
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value); // Actualizar el estado con el tipo seleccionado
        filterByType(event.target.value); // Filtrar por tipo
    };

    const handleOriginChange = (event) => {
        setSelectedOrigin(event.target.value); // Actualizar el estado con el origen seleccionado
        filterByOrigin(event.target.value); // Filtrar por origen
    };

    const getPokemonsByPage = () => {
        const startIndex = (currentPage - 1) * POKEMONS_PER_PAGE;
        const endIndex = startIndex + POKEMONS_PER_PAGE;
        return pokemonData.slice(startIndex, endIndex);
    };

    // Función para cambiar a la página siguiente
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Función para cambiar a la página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className={styles.container}>
            <h1>Entrená con nosotros</h1>
            
            <select value={selectedType} onChange={handleTypeChange}>
                <option value="">Filtrar por tipo</option>
                <option value="fire">Fuego</option>
                <option value="water">Agua</option>
                <option value="normal">Normal</option>
                <option value="fighting">Luchador</option>
                <option value="flying">Volador</option>
                <option value="poison">Veneno</option>
                <option value="ground">Suelo</option>
                <option value="rock">Roca</option>
                <option value="bug">Bicho</option>
                <option value="ghost">Fantasma</option>
                <option value="steel">Acero</option>
                <option value="grass">Césped</option>
                <option value="electric">Eléctrico</option>
                <option value="psychic">Psíquico</option>
                <option value="ice">Hielo</option>
                <option value="dragon">Dragón</option>
                <option value="dark">Oscuro</option>
                <option value="fairy">Hada</option>
                <option value="unknown">Desconocido</option>
                <option value="shadow">Sombra</option>
            </select>
            <select value={selectedOrigin} onChange={handleOriginChange}>
                <option value="">Mostrar todos los Pokémons</option>
                <option value="api">Mostrar solo Pokémons de la API</option>
                <option value="db">Mostrar solo Pokémons de la Base de Datos</option>
            </select>
            <input type='search' value={name} onChange={handleChange} placeholder="Ingresa el nombre de un Pokemon"/>
            <br />
            <button onClick={search}>Buscar por nombre</button>
            <button onClick={handleFormClick}>Crea tu Pokemon</button>
            {error && <p>Error: {error}</p>}
            {showForm && <Form />} {/* Renderizar el formulario si showForm es verdadero */}
            {showDetail && pokemonData.length === 1 && <Detail pokemon={pokemonData[0]} />} {/* Mostrar el detalle solo si hay un Pokémon */}
            <Cards pokemonData={getPokemonsByPage()} onCardClick={handleDetailClick} /> {/* Renderizar el componente Cards y pasar pokemonData como prop */}
            <div>
                {/* Botones de paginación */}
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={nextPage} disabled={pokemonData.length < POKEMONS_PER_PAGE}>Siguiente</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    typeFilter: state.typeFilter,
    originFilter: state.originFilter,
});

const mapDispatchToProps = {
  filterByType,
  filterByOrigin,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);



