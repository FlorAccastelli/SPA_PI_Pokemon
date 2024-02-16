const { Pokemon } = require('../db.js');

const postPokemons = async (req, res) => {
    try{
        const { name, image, health, attack, defense } = req.body

        if(![name, image, health, attack, defense].every(Boolean)) return res.status(401).json({message: "Faltan datos"})

        const newPokemon = await Pokemon.create({
            name,
            health,
            attack,
            defense,
            image
        })
        
        return res.status(200).json(newPokemon)

    } catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = postPokemons;