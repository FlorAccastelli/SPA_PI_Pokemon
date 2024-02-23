import React from 'react';
import './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

function MyButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home')
  }
  return (
    <button onClick={handleClick}>
      Explora ahora!
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className='container'>
      <h1>POKEMON</h1>
      <h2>Tu aventura</h2>
      <div className='content'>
      <p>¿Estás listo para embarcarte en una emocionante búsqueda llena de criaturas misteriosas y poderosas batallas? ¡Entonces has llegado al lugar adecuado!
      <br />
      En nuestra Home Page, encontrarás todo lo que necesitas para convertirte en un auténtico Entrenador Pokémon. 
      <br />
      Desde información detallada sobre tus Pokémon favoritos hasta herramientas para mejorar tus habilidades de batalla, estamos aquí para ayudarte a convertirte en el mejor entrenador que puedas ser.
      <br />
      ¡No pierdas más tiempo! Haz clic en el botón de abajo y adéntrate en el fascinante mundo de los Pokémon. 
      <br />
      ¡Tu próxima aventura te espera!</p>
      </div>
      <br />
      <MyButton />
    </div>
  );
}

