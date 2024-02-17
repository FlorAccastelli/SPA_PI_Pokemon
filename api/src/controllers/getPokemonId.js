const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon/'
const { Pokemon, PokemonType } = require("../db");

async function getPokemonId(req, res) {
    try {
        const { idPokemon } = req.params;

        let pokemon = await Pokemon.findByPk(idPokemon, { include: PokemonType });
    
        if(!pokemon) {
            const response = await axios.get(`${URL}${idPokemon}`);
            const data = response.data;

            pokemon = await Pokemon.create({
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                health: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
            })

            const types = data.types.map(type => type.type.name);
            await pokemon.setPokemonTypes(types);
            pokemon = await Pokemon.findByPk(idPokemon, { include: PokemonType }); 
        }   
        res.json(pokemon);

    } catch(error){
        res.status(500).send("No encontrado");
    }
}

module.exports = getPokemonId;