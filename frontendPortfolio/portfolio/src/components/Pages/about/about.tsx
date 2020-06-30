import React, { useContext } from 'react';
import './about.scss';

export const About = () => {
  return (
    <div className='About'>
      <div className='about '>
        <div className='text d-flex justify-content-around'>
          <div className='sobre mt-4'>
            <h1>Sobre </h1>
            <p>
              Sou iniciante no vasto universo da programação. Atualmente
              trabalho como freelancer em uma companhia de desenvolvimento web,
              buscando sempre aprender e desenvolver minhas habilidades.
            </p>
          </div>

          <div>
            <h5 className='mt-5'>Ferramentas Front-end</h5>
            <p>HTML</p>
            <p>CSS</p>
            <p>Bootstrap</p>
            <p>JavaScript</p>
            <p>React Hooks</p>
          </div>
          <div>
            {' '}
            <h5 className='mt-5'>Ferramentas Back-end</h5>
            <p>NodeJs</p>
            <p>Sequelize</p>
            <p>Typescript</p>
            <p>PostgreSql</p>
          </div>
        </div>
      </div>
    </div>
  );
};
