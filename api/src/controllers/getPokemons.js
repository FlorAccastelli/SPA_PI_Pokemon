// const axios = require('axios');
// const URL = 'https://pokeapi.co/api/v2/pokemon';

// async function getPokemons(req, res) {
//     try {
//         const { name } = req.query;
//         const { data } = await axios.get(`${URL}${name}`);

//         if (data.species.name) {
//             return res.status(200).json(data);
//         } else {
//             return res.status(404).send('Not found');   
//         }
//     } catch(error){
//         res.status(500).send(error.message);
//     }
// }

// module.exports = getPokemons;

const getPokemons = (req, res) => {
    res.send("Getting pokemons")
}

module.exports = getPokemons;