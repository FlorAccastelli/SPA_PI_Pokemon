const { Pokemon } = require('../db.js');

const postPokemons = async (req, res) => {
    const { name, health, attack, defense, image } = req.body

    const newPokemon = await Pokemon.create({
        name,
        health,
        attack,
        defense,
        image
    })
    res.send("creado")
}

module.exports = postPokemons;