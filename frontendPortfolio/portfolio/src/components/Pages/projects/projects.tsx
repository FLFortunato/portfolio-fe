import React from 'react';
import './projects.scss';

import List from '../../../assets/icons/list.svg';

import Chat from '../../../assets/icons/comment.svg';
import { Pages } from '../../../models/enum/enum';

export const Projects = () => {
  return (
    <div className='Projects'>
      <div className='projects d-flex justify-content-around container'>
        <div>
          <a href={Pages.TodoList}>
            <img src={List} alt='list' className='icons' />
          </a>
        </div>
        <div>
          <a href={Pages.Posts}>
            <img src={Chat} alt='list' className='icons' />
          </a>
        </div>
        <div>
          <img src={List} alt='list' className='icons' />
        </div>
      </div>
    </div>
  );
};
