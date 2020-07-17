import React, { useState, useEffect, useRef } from 'react';
import './register.scss';
import { Form } from '@unform/web';
import { InputCS } from '../../Forms/input';
import * as yup from 'yup';
import { Userservice } from '../../../services/user.service';
import { history } from '../../../history';
import Recaptcha from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Register = () => {
	const [check, setCheck] = useState(Boolean);
	const [isChecked, setIsChecked] = useState('password');

	const [captcha, setCaptcha] = useState('');

	const formRef = useRef<any>();
	const handleSubmit = async (data: any, { reset }: any) => {
		try {
			if (captcha) {
				const formSchema = yup.object().shape({
					email: yup
						.string()
						.email('Digite um e-mail válido')
						.required('Campo e-mail é necessário'),
					name: yup
						.string()
						.min(5, 'Nome deve ter no minímo 5 caracteres')
						.required('Campo nome é obrigatório'),
					password: yup.string().required('Campo senha é obrigatório'),
					passwordCheck: yup
						.string()
						.oneOf(
							[yup.ref('password'), undefined],
							'Confirme a senha corretamente'
						),
				});

				await formSchema.validate(data, {
					abortEarly: false,
				});

				Userservice()
					.create(data)
					.then(() => {
						toast.info('E-mail de verificação enviado', {
							position: toast.POSITION.BOTTOM_CENTER as any,
						});
					})
					.catch(() => {
						toast.warn('Algo de errado aconteceu');
					});
				history.push('/');
				reset();
			} else {
				alert('Complete o captcha');
			}
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				const errorMessages: any = {};

				error.inner.forEach((err) => (errorMessages[err.path] = err.message));
				formRef.current.setErrors(errorMessages);
			}
		}
	};

	useEffect(() => {
		if (check) {
			setIsChecked('');
		} else {
			setIsChecked('password');
		}
	}, [check]);

	const onCheckCaptcha = (value: any) => {
		setCaptcha(value);
	};

	const inputFields = [
		{ name: 'name', className: 'w-50 form-control mt-3', placeholder: 'Nome' },
		{
			name: 'lastName',

			placeholder: 'Sobrenome',
		},
		{
			name: 'email',

			placeholder: 'E-mail',
		},
		{
			name: 'password',

			placeholder: 'Senha',
			type: 'password',
		},
		{
			name: 'passwordCheck',

			placeholder: 'Confirme a senha',
			type: 'password',
		},
	];
	return (
		<div className='RegisterMain'>
			<div className='container'>
				<div className='row justify-content-center '>
					<div className='col-sm-12 col-md-8 col-lg-8 my-5 '>
						<Form
							onSubmit={handleSubmit}
							className='form-group position align-items-center '
							ref={formRef}
						>
							<h1 className='text-white mb-5'>Registrar</h1>
							{inputFields.map((inp, i) => {
								return (
									<InputCS
										key={i}
										name={inp.name}
										placeholder={inp.placeholder}
										className='w-100 form-control mt-3'
										type={inp.type}
									/>
								);
							})}

							<button
								className={`btn btn-success rounded mt-3 w-100 `}
								disabled={captcha ? false : true}
							>
								Registrar
							</button>
							<div className=' mt-4'>
								<Recaptcha
									sitekey='6LfOaqcZAAAAAKqfrBF4GAVkaGcWXU1sp9dhx0KU'
									onChange={onCheckCaptcha}
									hl='pt-BR'
								></Recaptcha>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};
