// validation.js
const regexName = /^[A-Za-z\s]+$/;
const regexImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
const regexNumber = /^\d+$/;
const regexDecimalNumber = /^\d+(\.\d+)?$/;

function validation(data) {
    const errors = {};

    if (!data.name || !regexName.test(data.name)) {
        errors.name = 'El nombre del Pokémon debe contener solo letras y espacios';
    }

    if (!data.image || !regexImage.test(data.image)) {
        errors.image = 'La URL de la imagen debe ser válida';
    }

    if (!data.health || !regexNumber.test(data.health)) {
        errors.health = 'La salud debe ser un número entero';
    }

    if (!data.attack || !regexNumber.test(data.attack)) {
        errors.attack = 'El ataque debe ser un número entero';
    }

    if (!data.defense || !regexNumber.test(data.defense)) {
        errors.defense = 'La defensa debe ser un número entero';
    }

    if (data.speed && !regexDecimalNumber.test(data.speed)) {
        errors.speed = 'La velocidad debe ser un número decimal';
    }

    if (data.height && !regexDecimalNumber.test(data.height)) {
        errors.height = 'La altura debe ser un número decimal';
    }

    if (data.weight && !regexDecimalNumber.test(data.weight)) {
        errors.weight = 'El peso debe ser un número decimal';
    }

    return errors;
}

export default validation;
