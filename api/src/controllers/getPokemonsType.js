const axios = require("axios");
const { PokemonType } = require("../db");
const URL = "https://pokeapi.co/api/v2/type"

async function getPokemonsType (req, res) {
    try{
        const typesCount = await PokemonType.count();
    if (typesCount === 0) {
        const response = await axios.get(`${URL}`);
        const typesData = response.data.results;

        for(const typeData of typesData) {
            await PokemonType.create({
                name: typeData.name
            });
        }
    }
    const types = await PokemonType.findAll({
        attributes: ['name']
    });
    const typeName = types.map(type => type.name);
    return res.status(200).json(typeName);

    }catch(error){
        return res.status(500).send("Error del servidor");
    } 
    
}

module.exports = getPokemonsType;