// const axios = require('axios');
// const URL = 'https://pokeapi.co/api/v2/pokemon/'

// async function getPokemonIdFromDB(id) {
//     return null
// }

// async function getPokemonId(req, res) {
//     try {
//         const pokemonId = req.params.id;
//         let pokemonData = await(getPokemonIdFromDB(pokemonId));
//         if(!pokemonData) {
//             //acá hacer algo
//         }
//         const { data } = await axios.get(`${URL}${pokemonId}`);
//         const { id, name, height, moves, abilities } = data;
//         const character = { id, name, height, moves, abilities };
//         if (character.name) {
//             return res.status(200).json(character);
//         } else {
//             return res.status(404).send('Not found');
//         }

//     } catch(error){
//         res.status(500).send(error.message);
//     }
// }

// module.exports = getPokemonId;