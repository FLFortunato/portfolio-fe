import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { PostServices } from '../../../../services/post.service';
import { TextAreaCS } from '../../../Forms/textarea';

export const EditModal = (data: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const [type, setType] = useState(Number);

  const selectType = (data: any) => {
    if (data === '1') {
      setType(1);
    } else {
      setType(0);
    }
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    PostServices()
      .getById(data.data)
      .then((res) => {
        setNewTitle(res.data.title);
        setNewContent(res.data.content);
      });
  }, []);

  const updateValue = () => {
    PostServices().update(data.data, {
      content: newContent,
      title: newTitle,
      type: type,
    });
    hideModal();
    window.location.reload(false);
  };

  return (
    <Fragment>
      <button onClick={showModal} className='btn btn-warning'>
        <span className='material-icons'>edit</span>
      </button>
      <Modal show={isOpen}>
        <ModalHeader>
          <ModalTitle>Editar</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className=''>
            <span className='mt-1'>Título: </span>
            <input
              className='form-control w-50'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            ></input>
          </div>
          <div className=''>
            <label htmlFor=''>Categoria:</label>
            <select
              name='type'
              form='formid'
              onChange={(e) => selectType(e.target.value)}
              className='form-control w-50 my-3'
            >
              <option value='1'>Elogio</option>
              <option value='0'>Crítica</option>
            </select>
          </div>
          <div className=''>
            <label htmlFor=''>Comentário:</label>
            <textarea
              className='form-control w-50'
              value={newContent}
              onChange={(e: any) => setNewContent(e.target.value)}
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={updateValue}>
            Salvar
          </button>
          <button onClick={hideModal} className='btn btn-danger'>
            Sair
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
