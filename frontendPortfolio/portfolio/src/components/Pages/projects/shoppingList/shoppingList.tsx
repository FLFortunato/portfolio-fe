import React, { useRef, useState } from 'react';
import './shoppingList.scss';
import { InputCS } from '../../../Forms/input';
import { Form } from '@unform/web';
export const ShoppingList = () => {
  const formRef = useRef<any>();

  const [typeOfFood, setTypeOfFood] = useState('');

  const [products, setProducts] = useState();

  const headerInputs = [
    { label: 'Produto', name: 'product', size: 'w-100' },
    { label: 'Qtd', name: 'qtd', type: 'number', size: 'w-100' },
    { label: 'Preço', name: 'price', type: 'number', size: 'w-100' },
  ];

  const options = [
    { value: '0', label: 'Grãos' },
    { value: '1', label: 'Bebidas' },
    { value: '2', label: 'Frios' },
    { value: '3', label: 'Verduras' },
    { value: '4', label: 'Laticínios' },
  ];

  const handleSubmit = (data: any) => {
    console.log({ ...data, type: Number(typeOfFood) });
  };
  const headerHtml = (
    <div className='d-flex row'>
      <div className='d-flex w-100 col'>
        {headerInputs.map((h, i) => {
          return (
            <div className='row  mr-4' key={i}>
              <div className='col'>
                <div className='d-flex'>
                  <label htmlFor='' className='mr-1'>
                    {h.label}:
                  </label>
                  <InputCS
                    name={h.name}
                    className={`form-control ${h.size}`}
                    type={h.type}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <select
        className='form-control w-25'
        form='form3'
        name='what'
        onChange={(e) => setTypeOfFood(e.target.value)}
      >
        <option value='null' selected={true} disabled>
          Categoria
        </option>
        {options.map((o, i) => {
          return <option value={o.value}>{o.label}</option>;
        })}
      </select>
    </div>
  );

  return (
    <div className='mainShoppingList'>
      <div className='container'>
        <div className='row '>
          <div className='col'>
            <div className='header p-4 '>
              <Form
                onSubmit={handleSubmit}
                className='d-flex justify-content-between'
                id='form3'
                ref={formRef}
              >
                {headerHtml}
              </Form>
            </div>
            <div className='body'>
              <div className='d-flex justify-content-between mx-5'>
                <p>item</p>
                <div className='d-flex justify-content-between w-25'>
                  <p>Qtd</p> <p>preco</p>
                </div>
              </div>
            </div>
            <div className='footer'>
              {' '}
              <button className='btn btn-primary w-100' form='form3'>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
