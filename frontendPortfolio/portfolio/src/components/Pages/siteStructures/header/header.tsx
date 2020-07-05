import React, { useEffect, useState } from 'react';
import './header.scss';
import $ from 'jquery';
import { Pages } from '../../../../models/enum/enum';

export const Header = () => {
  const logOut = () => {
    localStorage.clear();
  };

  const [menuToolbarOpen, setMenuToolbarOpen] = useState(false);

  useEffect(() => {
    if (menuToolbarOpen) {
      $('#mobile_menu').addClass('menu_expanded');
    } else {
      $('#mobile_menu').removeClass('menu_expanded');
    }
  }, [menuToolbarOpen]);

  const links = [
    { path: Pages.Home, text: 'Home' },
    { path: Pages.About, text: 'Sobre' },
    { path: Pages.Projects, text: 'Projetos' },
    { path: Pages.Contact, text: 'Contato' },
    { path: Pages.Profile, text: 'Perfil' },
    { path: '', text: 'Sair', func: logOut },
  ];
  return (
    <div className='header'>
      <div className='main d-flex justify-content-between'>
        <h1 className='mt-4 m-3'> {'<F/>'}</h1>
        <nav className='mt-4 m-3'>
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
      </div>
    </div>
  );
};
