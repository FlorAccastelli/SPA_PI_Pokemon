import { useState } from 'react';
import React from 'react';
import styles from './Form.module.css';
import validation from './validation';

function Form({ createPokemon }) {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        health: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        setErrors(validation({ ...formData, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes validar los datos antes de enviarlos
        if (Object.keys(errors).length === 0) {
            createPokemon(formData);
            // También puedes limpiar el formulario aquí si es necesario
            setFormData({
                name: '',
                image: '',
                health: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
            });
        }
    };

    return (
        <div className={styles.formWrapper}>
            <h2>Crear Nuevo Pokémon</h2>
            <form onSubmit={handleSubmit} className={styles.container}>
                <label htmlFor="name">
                    Nombre:
                    <input type='text' placeholder='Ingrese el nombre del Pokémon' id='name' name='name' value={formData.name} onChange={handleChange} className={errors.name && styles.warning} />
                </label>
                {errors.name && <p className={styles.danger}>{errors.name}</p>}
                <br />
                {/* Agregar más campos aquí para los atributos del Pokémon */}
                <button className={styles.submitButton}>Crear Pokémon</button>
            </form>
        </div>
    );
}

export default Form;
