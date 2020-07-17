import React, { useRef, useState, useEffect } from 'react';
import './shoppingList.scss';
import { InputCS } from '../../../Forms/input';
import { Form } from '@unform/web';
import { ProductsService } from '../../../../services/products.service';
import { ProductsInterface } from '../../../../models/products.model';
import { EditModal } from './modal';

const userId = (localStorage.getItem('userid') || '');

export const ShoppingList = () => {
  const formRef = useRef<any>();

  const [typeOfFood, setTypeOfFood] = useState('');
  const [totalPrice, setTotalPrice] = useState(Number);
  const [products, setProducts] = useState<ProductsInterface[]>([]);
  const [renderArr, setRenderArr] = useState([]);

  const headerInputs = [
    { label: 'Produto', name: 'name', size: 'w-100' },
    { label: 'Qtd', name: 'qtd', type: 'number', size: 'w-100' },
    {
      label: 'Preço',
      name: 'price',
      type: 'number',
      size: 'w-100',
      step: '0.01',
    },
  ];

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

  const handleSubmit = (data: any) => {
    const cat = Number(typeOfFood);

    console.log('CATEGORY ==>', cat);
    ProductsService()
      .create(userId, cat, data)
      .then((res) => {
        console.log(res.data);
      });

    setRenderArr([...renderArr]);
  };

  const deleteAction = (id: any) => {
    ProductsService().remove(id);
    setRenderArr([]);
  };

  useEffect(() => {
    ProductsService()
      .getById(userId)
      .then((res) => {
        setProducts(res.data);
      });
  }, [renderArr, totalPrice]);

  const headerHtml = (
    <div className='d-flex row'>
      <p>Under development</p>
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
                    step={h.step}
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
        <option value='Categoria' defaultValue='Categoria'>
          Categoria
        </option>
        {options.map((o, i) => {
          return (
            <option value={o.value} key={i}>
              {o.label}
            </option>
          );
        })}
      </select>
    </div>
  );
  const bodyHtml = (
    <div>
      {products.map((p, i) => {
        return (
          <div
            className='d-flex justify-content-between ml-3 my-2  w-100'
            key={i}
          >
            <div className='d-flex justify-content-between w-50 '>
              <p className=''>{p.name}</p>
              <p>{p.qtd}</p> <p className='ml-5'>R${p.price.toFixed(2)}</p>{' '}
              <p>R${p.total.toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-around w-25'>
              <button
                className='btn btn-danger'
                onClick={() => deleteAction(p.id)}
              >
                <span className='material-icons'>delete_outline</span>
              </button>

              <EditModal data={p} />
            </div>
          </div>
        );
      })}
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
            <div className='body py-2'>
              <div className='d-flex justify-content-between ml-3  w-100'>
                <div className='d-flex justify-content-between w-50'>
                  <p>Produto</p> <p>Quantidade</p> <p>Preço</p> <p>Total</p>
                </div>
                <div className='d-flex justify-content-around w-25'></div>
              </div>
              {bodyHtml}
              <p>total: {totalPrice}</p>
            </div>
            <div className='footer'>
              <button className='btn btn-primary w-2' form='form3'>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
