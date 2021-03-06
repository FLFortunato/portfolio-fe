import React, { useRef } from 'react';
import { InputCS } from '../../Forms/input';
import { Form } from '@unform/web';
import './resetPass.scss';
import * as Yup from 'yup';
import { Userservice } from '../../../services/user.service';

export const ResetPassPage = () => {
  const token = window.location.pathname.replace('/resetarsenha/', '');
  const formRef = useRef<any>();
  const handleSubmit = async (data: any, { reset }: any) => {
    try {
      const validSchema = Yup.object().shape({
        password: Yup.string().required('Campo obrigatório'),
        checkpassword: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'Senha não confere'
        ),
      });

      Userservice()
        .resetPass({ password: data.password, token: token })
        .then((res) => {
          return;
        });
      await validSchema.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages: any = {};

        error.inner.forEach((err) => (errorMessages[err.path] = err.message));
        formRef.current.setErrors(errorMessages);
      }
    }
    reset();
  };
  return (
    <div className=' mainResetPass'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-lg-4'>
            <div>
              <h3 className=''>Digite sua nova senha:</h3>
              <p>Senha: </p>
              <div className=''>
                <Form onSubmit={handleSubmit} ref={formRef}>
                  <div>
                    <InputCS
                      name='password'
                      className='form-control'
                      type='password'
                    />
                  </div>
                  <div className='mt-4'>
                    <p>Confirme a senha:</p>
                    <InputCS
                      name='checkpassword'
                      className='form-control'
                      type='password'
                    />
                  </div>
                  <button className='btn btn-primary my-3'>Enviar</button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
