import React, { useEffect, useState } from 'react';
import './header.scss';
import $ from 'jquery';
import { Pages } from '../../../../models/enum/enum';

export const Header = () => {
  const logOut = () => {
    localStorage.clear();
  };

  const [bigScreenNav, setBigScreenNav] = useState(true);
  const [phoneMenu, setPhoneMenu] = useState(false);

  const links = [
    { path: Pages.Home, text: 'Home' },
    { path: Pages.About, text: 'Sobre' },
    { path: Pages.Projects, text: 'Projetos' },
    { path: Pages.Contact, text: 'Contato' },
    { path: Pages.Profile, text: 'Perfil' },
    { path: '', text: 'Sair', func: logOut },
  ];

  useEffect(() => {
    if (window.screen.width <= 360) {
      setBigScreenNav(false);
    }
  }, []);

  return (
    <div className='header'>
      <div className='main d-flex justify-content-between'>
        <h1 className='mt-4 m-3'> {'<F/>'}</h1>
        <nav className={`mt-4 m-3 ${bigScreenNav ? '' : 'invisible'}`}>
          <ul className='d-flex ulStyle'>
            {links.map((l, i) => {
              return (
                <li onClick={l.func} key={i} className='mx-2 mt-2'>
                  <a href={l.path}>{l.text}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        <span
          className={`material-icons icon_size ${
            !bigScreenNav ? '' : 'invisible'
          }`}
          onClick={() => setPhoneMenu(!phoneMenu)}
        >
          menu
        </span>
      </div>
      <div
        className={`responsive_menu text-center ${
          phoneMenu ? '' : 'invisible'
        }`}
      >
        <ul>
          {links.map((l, i) => {
            return (
              <li onClick={l.func} key={i} className=' p-4'>
                <a href={l.path}>{l.text}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
