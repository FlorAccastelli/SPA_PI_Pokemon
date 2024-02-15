// const axios = require('axios');
// const URL = 'https://pokeapi.co/api/v2/pokemon/';
// const Pokemon = require('../models/Pokemon');

// async function getPokemonByName(req, res) {
//     try {
//         const pokemonName = req.query.name.toLowerCase();
//         let pokemon = await Pokemon.findAll({ name: pokemonName});

//         if(!pokemon) {
//             const { data } = axios.get(`${URL}${pokemonName}`);
//             pokemon = data;
//         }
//         res.status(200).json(pokemon);
//     } catch(error) {
//         res.status(404).send("No existe pokemon con ese nombre")
//     }
// }

// module.exports = getPokemonByName;