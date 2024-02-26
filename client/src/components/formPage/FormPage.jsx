import { useState } from 'react';
import styles from './Form.module.css';
import validation from './validation';
import axios from 'axios';

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        health: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (name === 'types') {
            if (checked) {
                setFormData(prevState => ({
                    ...prevState,
                    types: [...prevState.types, value]
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    types: prevState.types.filter(type => type !== value)
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        // setErrors(validation({ ...formData, [name]: value }));
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validation(formData); // Validar los datos antes de enviar la solicitud
        setErrors(errors);
    
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3001/pokemons', formData);
                if (response.status === 200) {
                    // El Pokémon se guardó correctamente en la base de datos
                    alert('¡El Pokémon se guardó correctamente!');
                    setFormData({
                        name: '',
                        image: '',
                        health: '',
                        attack: '',
                        defense: '',
                        speed: '',
                        height: '',
                        weight: '',
                        types: []
                    });
                } else {
                    throw new Error('Error al guardar el Pokémon en la base de datos');
                }
            } catch (error) {
                console.error('Error al guardar el Pokémon:', error);
                // Manejo de errores
            }
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
                <label htmlFor="image">
                    Imagen:
                    <input type='text' placeholder='Ingrese la URL de la imagen' id='image' name='image' value={formData.image} onChange={handleChange} className={errors.image && styles.warning} />
                </label>
                {errors.image && <p className={styles.danger}>{errors.image}</p>}
                <br />
                <label htmlFor="health">
                    Vida:
                    <input type='number' placeholder='Ingrese la vida' id='health' name='health' value={formData.health} onChange={handleChange} className={errors.health && styles.warning} />
                </label>
                {errors.health && <p className={styles.danger}>{errors.health}</p>}
                <br />
                <label htmlFor='attack'>
                    Ataque:
                    <input type='number' placeholder='Ingrese el ataque' id='attack' name='attack' value={formData.attack} onChange={handleChange} className={errors.attack && styles.warning} />
                </label>
                {errors.attack && <p className={styles.danger}>{errors.attack}</p>}
                <br />
                <label htmlFor='defense'>
                    Defensa:
                    <input type='number' placeholder='Ingrese la defensa' id='defense' name='defense' value={formData.defense} onChange={handleChange} className={errors.defense && styles.warning} />
                </label>
                {errors.defense && <p className={styles.danger}>{errors.defense}</p>}
                <br />
                <label htmlFor='speed'>
                    Velocidad:
                    <input type='number' placeholder='Ingrese la velocidad' id='speed' name='speed' value={formData.speed} onChange={handleChange} className={errors.speed && styles.warning} />
                </label>
                {errors.speed && <p className={styles.danger}>{errors.speed}</p>}
                <br />
                <label htmlFor='height'>
                    Altura:
                    <input type='number' placeholder='Ingrese la altura' id='height' name='height' value={formData.height} onChange={handleChange} className={errors.height && styles.warning} />
                </label>
                {errors.height && <p className={styles.danger}>{errors.height}</p>}
                <br />
                <label htmlFor='weight'>
                    Peso:
                    <input type='number' placeholder='Ingrese el peso' id='weight' name='weight' value={formData.weight} onChange={handleChange} className={errors.weight && styles.warning} />
                </label>
                {errors.weight && <p className={styles.danger}>{errors.weight}</p>}
                <br />
                <label htmlFor="types">
                    Tipo:
                    <div className={styles.checkBox}>
                        <input type="checkbox" name="types" value="normal" checked={formData.types.includes('normal')} onChange={handleChange} />
                        <label htmlFor="normal">Normal</label>
                    </div>
                    <div>
                        <input type="checkbox" name="types" value="fighting" checked={formData.types.includes('fighting')} onChange={handleChange} />
                        <label htmlFor="fighting">Fighting</label>
                    </div>
                    <div>
                        <input type="checkbox" name="types" value="flying" checked={formData.types.includes('flying')} onChange={handleChange} />
                        <label htmlFor="flying">Flying</label>
                    </div>
                    <div>
                        <input type="checkbox" name="types" value="poison" checked={formData.types.includes('poison')} onChange={handleChange} />
                        <label htmlFor="poison">Poison</label>
                    </div>
                    <div>
                        <input type="checkbox" name="types" value="ground" checked={formData.types.includes('ground')} onChange={handleChange} />
                        <label htmlFor="ground">Ground</label>
                    </div>
                </label>
                <br />
                <button className={styles.submitButton}>Crear Pokemon</button>
            </form>
        </div>
    );
}

export default Form;
