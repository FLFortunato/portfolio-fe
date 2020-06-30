import React, { useEffect, useState, useRef } from 'react';
import { Userservice } from '../../../services/user.service';
import './profile.scss';
import { Form } from '@unform/web';
import { InputCS } from '../../Forms/input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cep from 'cep-promise';

toast.configure();
export const Profile = () => {
  const formRef = useRef<any>();
  const user = JSON.parse(localStorage.getItem('userid') || '{}');
  const [cepNumber, setCepNumber] = useState('');

  useEffect(() => {
    Userservice()
      .getById(user)
      .then((res) => {
        formRef.current.setData(res.data);
      });
    cep(cepNumber).then((res) => {
      formRef.current.setData(res);
    });
  }, [cepNumber]);

  const handleSubmit = (data: any) => {
    Userservice()
      .updateProfile(user, { ...data, cep: cepNumber })
      .then(() => {
        toast.success('Dados alterados', {
          position: toast.POSITION.BOTTOM_CENTER as any,
        });
      });
  };

  const personalDatas = [
    { name: 'email', placeholder: 'Email', readOnly: true },
    { name: 'name', placeholder: 'Nome' },
    { name: 'lastName', placeholder: 'Sobrenome' },
  ];
  return (
    <div>
      <div className='container MainProfile'>
        <div className='body'>
          <h2>Perfil</h2>
          <div className='row'>
            <div className='col-12'>
              <Form
                onSubmit={handleSubmit}
                className='form-group '
                ref={formRef}
              >
                <div>
                  <h6 className='mt-3'>Dados Pessoais</h6>
                  {personalDatas.map((p) => {
                    return (
                      <InputCS
                        name={p.name}
                        className={`w-50 form-control mt-3 `}
                        placeholder={p.placeholder}
                        readOnly={p.readOnly}
                      />
                    );
                  })}
                </div>

                <div className='mt-5 '>
                  <h6>Endereço</h6>
                  <div className='divWidth d-flex justify-content-between'>
                    <InputCS
                      name='street'
                      className={` w-100 form-control mt-3 `}
                      placeholder='Endereço'
                      readOnly
                    />
                    <InputCS
                      name='neighborhood'
                      className={` w-100 form-control mt-3 `}
                      placeholder='Bairro'
                      readOnly
                    />
                  </div>
                  <div className='divWidth d-flex justify-content-between'>
                    <input
                      name='cep'
                      type='text'
                      className='form-control w-40 mt-3'
                      onChange={(e) => setCepNumber(e.target.value)}
                      placeholder='cep'
                    />
                    <InputCS
                      name='number'
                      className={` w-100 form-control mt-3 `}
                      placeholder='Nº'
                    />
                  </div>
                  <div className='d-flex justify-content-between divWidth'>
                    <InputCS
                      name='city'
                      className={`w-100 form-control mt-3 $`}
                      placeholder='Cidade'
                      readOnly
                    />
                    <InputCS
                      name='state'
                      className={`w-100 form-control mt-3 $`}
                      placeholder='Estado'
                      readOnly
                    />
                  </div>
                  <InputCS
                    name='complement'
                    className={`w-50 form-control mt-3 $`}
                    placeholder='Complemento'
                  />
                </div>

                <button
                  className='btn btn-success rounded mt-3 w-50'
                  type='submit'
                >
                  Atualizar
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
