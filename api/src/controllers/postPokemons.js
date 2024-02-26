const { Pokemon } = require('../db.js');

const postPokemons = async (req, res) => {
    console.log("BACKEND");
    console.log(req.body);
    try {
        const { name, image, health, attack, defense } = req.body;
        
        // Verifica si todos los campos requeridos están presentes
        if (![name, image, health, attack, defense].every(Boolean)) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        // Crea un nuevo Pokémon en la base de datos
        const newPokemon = await Pokemon.create({
            name,
            health,
            attack,
            defense,
            image
        });
        
        // Devuelve el nuevo Pokémon creado
        return res.status(200).json(newPokemon);
    } catch(error) {
        // Maneja los errores internos del servidor
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = postPokemons;
