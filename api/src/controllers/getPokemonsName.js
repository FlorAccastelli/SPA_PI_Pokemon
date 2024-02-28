const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const { Pokemon } = require('../db');

async function getPokemonByName(req, res) {
    // try {
        const pokemonName = req.query.name.toLowerCase();
        let pokemons = await Pokemon.findAll({ where: { name: pokemonName } });

        if(!pokemons || pokemons.length === 0) {
            const response = await axios.get(`${URL}${pokemonName}`);
            
            const pokemonData = response.data;
            const relevantData = [{
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                health: pokemonData.stats[0].base_stat,
                attack: pokemonData.stats[1].base_stat,
                defense: pokemonData.stats[2].base_stat,                    
                speed: pokemonData.stats[5].base_stat,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types.map(type => type.type.name)
            }];
            return res.status(200).json(relevantData);
        }
        res.status(200).json(pokemons);
    // } catch(error) {
    //     if(error.response && error.response.status === 404){
    //         return res.status(404).send("No existe un pokemon con ese nombre");
    //     }else{
    //         res.status(500).send(error.message)
    //     }
    // }
}

module.exports = getPokemonByName;