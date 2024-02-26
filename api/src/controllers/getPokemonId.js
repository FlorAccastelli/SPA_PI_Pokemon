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
                health: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
                attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
                defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
                speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat,
                height: data.height,
                weight: data.weight,
            });

            const typesFromAPI = data.types.map(type => type.type.name);
            for (const typeName of typesFromAPI) {
                const [type, created] = await PokemonType.findOrCreate({ where: { name: typeName } });
                await pokemon.addPokemonType(type);
            }
            
        }   
        res.json(pokemon);

    } catch(error){
        res.status(500).send("Error interno en el servidor");
    }
}

module.exports = getPokemonId;