import React, { useState, useRef } from 'react';
import { InputCS } from '../../../Forms/input';
import { Form } from '@unform/web';
import './tables.scss';
import Recaptcha from 'react-google-recaptcha';
import * as Yup from 'yup';

export const TableFrag = (data: any) => {
	const [captcha, setCaptcha] = useState(false);
	const formRef = useRef<any>();

	const onCheckCaptcha = (data: any) => {
		if (data) {
			setCaptcha(true);
		}
	};

	const inputsArr = [
		{ label: 'Nome:', name: 'name' },
		{ label: 'Sobrenome:', name: 'lastname' },
		{ label: 'Idade:', name: 'age' },
		{ label: 'Email:', name: 'email' },
	];

	const addressInputsArr = [
		{ label: 'Bairro:', name: 'Neighborhood' },
		{ label: 'Cidade:', name: 'city' },
		{ label: 'Estado:', name: 'state' },
	];

	const handleSubmit = async (data: any) => {
		try {
			if (captcha) {
				const formSchema = Yup.object().shape({
					name: Yup.string().min(5).required('Campo obrigatório'),
					lastname: Yup.string().required(),
					age: Yup.number().required(),
					email: Yup.string().email().required(),
				});
				await formSchema.validate(data, {
					abortEarly: false,
				});
			}
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages: any = {};

				error.inner.forEach((err) => (errorMessages[err.path] = err.message));
				formRef.current.setErrors(errorMessages);
			}
		}
	};

	return (
		<div className='main_trying'>
			<div className='container'>
				<Form onSubmit={handleSubmit} ref={formRef}>
					<div className='row '>
						<div className='col-lg-6 col-md-8 mt-4'>
							<h3>Formulário</h3>

							{inputsArr.map((inp, i) => {
								return (
									<div className='d-flex flex-column my-3 ' key={i}>
										<span>{inp.label}</span>{' '}
										<InputCS name={inp.name} className='form-control' />
									</div>
								);
							})}
						</div>
						<div className='col mt-4'>
							<h3>Formulário de Endereço</h3>
							<div className=''>
								<div className='d-flex flex-row my-3 w-100 '>
									<div className='d-flex flex-column w-75'>
										<span>Rua:</span>
										<InputCS name='street' className='form-control' />{' '}
									</div>
									<div className='d-flex flex-column ml-3 w-25'>
										<span>Nº:</span>
										<InputCS name='number' className='form-control' />{' '}
									</div>
								</div>
								{addressInputsArr.map((a, i) => {
									return (
										<div className='d-flex flex-column my-3' key={i}>
											<span>{a.label}</span>
											<InputCS name={a.name} className='form-control' />{' '}
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<button
						className='btn btn-success btn_main '
						disabled={captcha ? false : true}
					>
						Enviar
					</button>
				</Form>
				<div className='my-5'>
					<Recaptcha
						sitekey='6LfOaqcZAAAAAKqfrBF4GAVkaGcWXU1sp9dhx0KU'
						onChange={onCheckCaptcha}
						hl='pt-BR'
					></Recaptcha>
				</div>
			</div>
		</div>
	);
};
