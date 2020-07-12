import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { PostServices } from '../../../../services/post.service';
import { TextAreaCS } from '../../../Forms/textarea';
import { ProductsService } from '../../../../services/products.service';

export const EditModal = (data: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(data.data.name);
  const [newPrice, setNewPrice] = useState(data.data.price);
  const [newQtd, setNewQtd] = useState(data.data.qtd);

  const [type, setType] = useState(data.data.category);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const updateValue = () => {
    ProductsService()
      .update(data.data.id, {
        category: type,
        name: newProduct,
        price: newPrice,
        qtd: newQtd,
      })
      .then((res) => {
        console.log('RESULTADO ==>', res.data);
        hideModal();
      });

    window.location.reload(false);
  };

  const options = [
    { value: '1', label: 'Legumes' },
    { value: '2', label: 'Verduras' },
    { value: '3', label: 'Carnes' },
    { value: '4', label: 'Grãos' },
    { value: '5', label: 'Bebidas' },
    { value: '6', label: 'Laticínios' },
    { value: '7', label: 'Frios' },
    { value: '8', label: 'Congelados' },
  ];

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
            <span className='mt-1'>Produto: </span>
            <input
              className='form-control w-50'
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
            ></input>
          </div>
          <div className='my-3'>
            <span className='mt-1'>Qtd: </span>
            <input
              className='form-control w-50'
              value={newQtd}
              onChange={(e) => setNewQtd(Number(e.target.value))}
            ></input>
          </div>
          <div className=''>
            <span className='mt-1'>Preço: </span>
            <input
              className='form-control w-50'
              onChange={(e) => setNewPrice(Number(e.target.value))}
              value={newPrice}
              type='number'
              step='0.01'
            ></input>
          </div>
          <div className=' my-3'>
            <span className='mt-1'>Total: </span>
            <input
              className='form-control w-50'
              value={`R$${data.data.total}`}
              disabled
            ></input>
          </div>
          <div className=' my-3'>
            <label htmlFor=''>Categoria:</label>
            <select
              name='type'
              form='formid'
              onChange={(e) => setType(Number(e.target.value))}
              className='form-control w-50'
              onSelect={type}
            >
              {options.map((o, i) => {
                return <option value={o.value}>{o.label}</option>;
              })}
            </select>
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
