import React, { useRef, useState } from 'react';
import { InputCS } from '../../Forms/input';
import { Form } from '@unform/web';
import './forgotPass.scss';
import * as Yup from 'yup';
import { Userservice } from '../../../services/user.service';
import Recaptcha from 'react-google-recaptcha';
import { toast } from 'react-toastify';

export const ForgotPassPage = () => {
  const [captcha, setCaptcha] = useState('');
  const formRef = useRef<any>();
  const handleSubmit = async (data: any, { reset }: any) => {
    try {
      const validSchema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Campo obrigatório'),
      });

      Userservice()
        .forgotPass(data)
        .then((res) => {
          toast.warning('Verifique seu E-mail', {
            position: toast.POSITION.BOTTOM_CENTER as any,
          });
        })
        .catch((e) => {
          toast.dark('E-mail incorreto', {
            position: toast.POSITION.BOTTOM_CENTER as any,
          });
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

  const onCheckCaptcha = (value: any) => {
    setCaptcha(value);
  };
  return (
    <div className='container mainForgot'>
      <div className='row'>
        <div className='col-4'>
          <div>
            <h3 className='my-5'>Esqueceu sua senha?</h3>
            <p>Digite seu email abaixo: </p>
            <div className=''>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <InputCS name='email' className='form-control' />
                <button
                  className='btn btn-primary my-3'
                  disabled={captcha ? false : true}
                >
                  Enviar
                </button>
              </Form>
              <Recaptcha
                sitekey='6LfOaqcZAAAAAKqfrBF4GAVkaGcWXU1sp9dhx0KU'
                onChange={onCheckCaptcha}
                hl='pt-BR'
              ></Recaptcha>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
