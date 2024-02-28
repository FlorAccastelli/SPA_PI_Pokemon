const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemon } = require('../db.js');

async function getPokemons(req, res) {
    try {
        let selectedType = req.query.type; // Obtener el tipo seleccionado de la consulta

        let dbPokemons, apiPokemons;

        // Obtener los pokémones de la base de datos si hay un tipo seleccionado
        if (selectedType) {
            dbPokemons = await Pokemon.findAll({ where: { type: selectedType } });
        } else {
            dbPokemons = await Pokemon.findAll();
        }

        // Obtener los pokémones de la API si hay un tipo seleccionado
        if (selectedType) {
            const response = await axios.get(`${URL}?type=${selectedType}`);
            apiPokemons = await Promise.all(response.data.results.map(async (pokemon) => {
                const response = await axios.get(pokemon.url);
                const pokemonData = response.data;
                const relevantData = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    health: pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat,
                    attack: pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat,
                    defense: pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat,
                    speed: pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat,
                    height: pokemonData.height,
                    weight: pokemonData.weight,
                    types: pokemonData.types.map(type => type.type.name)
                };
                return relevantData;
            }));
        } else {
            const response = await axios.get(`${URL}`);
            apiPokemons = await Promise.all(response.data.results.map(async (pokemon) => {
                const response = await axios.get(pokemon.url);
                const pokemonData = response.data;
                const relevantData = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    health: pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat,
                    attack: pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat,
                    defense: pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat,
                    speed: pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat,
                    height: pokemonData.height,
                    weight: pokemonData.weight,
                    types: pokemonData.types.map(type => type.type.name)
                };
                return relevantData;
            }));
        }

        const allPokemons = [...dbPokemons, ...apiPokemons];
        res.json(allPokemons);

    } catch(error){
        console.error('Error al obtener los Pokémon:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = getPokemons;
