import React, { useState, useEffect, useRef, useContext } from 'react';
import './login.scss';
import { Form } from '@unform/web';
import { InputCS } from '../../Forms/input';
import * as yup from 'yup';
import { Userservice } from '../../../services/user.service';
import { history } from '../../../history';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure();

export const Login = () => {
  const [isChecked, setIsChecked] = useState('password');
  const [classs, setClasss] = useState('');
  const [loading, setLoading] = useState(false);

  const formRef = useRef<any>();
  const handleSubmit = async (data: any, { reset }: any) => {
    try {
      const formSchema = yup.object().shape({
        email: yup
          .string()
          .email('Digite um e-mail válido')
          .required('Campo e-mail é necessário'),

        password: yup.string().required('Campo senha é obrigatório'),
      });

      await formSchema.validate(data, {
        abortEarly: false,
      });

      Userservice()
        .login(data)
        .then((res) => {
          if (res.data.user.emailConfirmed) {
            localStorage.setItem('auth-token', res.data.token);
            const userIdCheck = res.data.user.id;
            localStorage.setItem('userid', userIdCheck);
            history.push('/home');
          } else {
            toast.dark('E-mail não verificado', {
              position: toast.POSITION.BOTTOM_CENTER as any,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      reset();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages: any = {};

        error.inner.forEach((err) => (errorMessages[err.path] = err.message));
        formRef.current.setErrors(errorMessages);
      }
    }
  };

  return (
    <div className='RegisterMain'>
      <div className='container'>
        <div className='row justify-content-center '>
          <div className='col-12 col-sm-6 col-md-9 '>
            <Form
              onSubmit={handleSubmit}
              className='form-group position '
              ref={formRef}
            >
              <h1 className='text-white mb-5'>Login</h1>
              <InputCS
                name='email'
                className={`w-50 form-control mt-3 ${classs}`}
                placeholder='E-mail'
                type='email'
              />
              <InputCS
                name='password'
                className={`w-50 form-control mt-3 ${classs}`}
                placeholder='Senha'
                type={`${isChecked}`}
              />
              <button className='btn btn-success rounded mt-5 w-50'>
                Login
              </button>
              <br />
              <div className='d-flex justify-content-between  mt-1 w-50'>
                <a href='/esqueceusenha'>Esqueceu a senha?</a>{' '}
                <a href='/registrar'>Registrar</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
