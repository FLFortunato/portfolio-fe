import React, { useRef, useState } from 'react';
import './contact.scss';
import Recaptcha from 'react-google-recaptcha';

import { Form } from '@unform/web';
import { InputCS } from '../../Forms/input';
import { TextAreaCS } from '../../Forms/textarea';
import { UtilService } from '../../../services/util.service';

export const Contact = () => {
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);

  const onCheckCaptcha = (value: any) => {
    setCaptcha(value);
  };

  const formRef = useRef<any>();
  const handleSubmit = (data: any) => {
    if (captcha) {
      setLoading(true);
      UtilService()
        .create({
          subject: data.subject,
          text: `
      <h1>${data.name} </h1>
      <div>${data.email} </div>
      <div>${data.subject} </div>

      `,
        })
        .finally(() => {
          alert('Email enviado');
          setLoading(false);
        });
    } else {
      alert('Complete o captcha');
    }
  };

  const inputs = [
    { name: 'subject', placeholder: 'Assunto' },
    { name: 'name', placeholder: 'Nome' },
    { name: 'email', placeholder: 'E-mail' },
  ];
  return (
    <div className='Contact '>
      <div className='contact '>
        <h1 className='mt-5 ml-5'>
          <b>FALE COMIGO</b>
        </h1>
        <div className='row'>
          <div className='col-6  ml-5'>
            <Form onSubmit={handleSubmit} ref={formRef} id='formid'>
              {inputs.map((inp, i) => {
                return (
                  <InputCS
                    key={i}
                    name={inp.name}
                    placeholder={inp.placeholder}
                    className='form-control w-100 mt-3'
                  />
                );
              })}
              <TextAreaCS
                className='form-control w-100 mt-3'
                rows={10}
                name='text'
                form='formid'
              />

              <button className='btn btn-success w-25 mt-3'>Enviar</button>
            </Form>
            <div className='captcha mt-4'>
              <Recaptcha
                sitekey='6LfOaqcZAAAAAKqfrBF4GAVkaGcWXU1sp9dhx0KU'
                onChange={onCheckCaptcha}
                hl='pt-BR'
              ></Recaptcha>
            </div>
          </div>
          <div className='col-5 '>
            <div className='row'>
              <div className='col-12 heightSize'></div>
              <div className='col-6'>
                <div className='d-flex '>
                  <h3 className='material-icons iconFontSize marginB'>call</h3>

                  <h4 className='text-secondary'>(31) 99591-3071</h4>
                </div>
                <div className='d-flex mt-4'>
                  <h3 className='material-icons iconFontSize marginB'>email</h3>

                  <a
                    href='mailto:   filipifortunato@gmail.com'
                    target='_blank'
                    className='ml-1'
                  >
                    <h4 className='text-secondary'>
                      filipifortunato@gmail.com
                    </h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
