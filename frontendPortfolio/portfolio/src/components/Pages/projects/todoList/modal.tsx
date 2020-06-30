import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { TodoListService } from '../../../../services/todoList.service';

export const EditModal = (data: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [newContent, setNewContent] = useState(data.content);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    TodoListService()
      .getById(data.data)
      .then((res) => {
        setNewContent(res.data.content);
      });
  }, []);

  const updateValue = () => {
    TodoListService().update(data.data, { content: newContent });
    hideModal();
    window.location.reload(false);
  };

  return (
    <Fragment>
      <button onClick={showModal} className='btn btn-primary'>
        <span className='material-icons'>edit</span>
      </button>
      <Modal show={isOpen}>
        <ModalHeader>
          <ModalTitle>Editar ToDo</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <input
            className='form-control'
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          ></input>
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
