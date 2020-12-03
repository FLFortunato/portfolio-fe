import React, { useEffect, useState, useRef } from 'react';
import { Userservice } from '../../../services/user.service';
import './profile.scss';
import { Form } from '@unform/web';
import { InputCS } from '../../Forms/input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cep from 'cep-promise';
import { useSelector, useDispatch } from 'react-redux';
import { INCREMENT } from '../../../redux/Math/types';
import { fetchUsers } from '../../../redux/Users/reducer';

toast.configure();
export const Profile = () => {
	const formRef = useRef<any>();
	const user = JSON.parse(localStorage.getItem('userid') || '{}');
	const [cepNumber, setCepNumber] = useState('');
	const { data, loading, error } = useSelector(
		(state: any) => state.UserReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers('GET'));
		Userservice()
			.getById(user)
			.then((res) => {
				formRef.current.setData(res.data);
			});
		cep(cepNumber).then((res) => {
			formRef.current.setData(res);
		});
	}, [cepNumber]);
	console.log(data);
	const handleSubmit = (data: any) => {
		Userservice()
			.updateProfile(user, data)
			.then(() => {
				toast.success('Atualização efetuada', {
					position: toast.POSITION.BOTTOM_CENTER as any,
				});
			})
			.catch(() => {
				toast.error('Atualização não efetuada', {
					position: toast.POSITION.BOTTOM_CENTER as any,
				});
			});
	};

	const personalDatas = [
		{ name: 'email', placeholder: 'Email', readOnly: true },
		{ name: 'name', placeholder: 'Nome' },
		{ name: 'lastName', placeholder: 'Sobrenome' },
	];

	const addressDatas = [
		{
			name: 'street',
			className: 'w-100 form-control mt-3',
			placeholder: 'Endereço',
			readOnly: true,
		},
		{
			name: 'neighborhood',
			className: 'w-100 form-control mt-3',
			placeholder: 'Bairro',
			readOnly: true,
		},
		{
			name: 'cep',
			className: 'w-100 form-control mt-3',
			placeholder: 'Cep',
			readOnly: false,
		},
		{
			name: 'number',
			className: 'w-100 form-control mt-3',
			placeholder: 'Nº',
			readOnly: false,
		},
		{
			name: 'city',
			className: 'w-100 form-control mt-3',
			placeholder: 'Cidade',
			readOnly: true,
		},
		{
			name: 'state',
			className: 'w-100 form-control mt-3',
			placeholder: 'Estado',
			readOnly: true,
		},
		{
			name: 'complement',
			className: 'w-100 form-control mt-3',
			placeholder: 'Complemento',
			readOnly: false,
		},
	];

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-sm-12 col-lg-6 my-3'>
					<h2>Perfil</h2>

					<Form onSubmit={handleSubmit} className='form-group ' ref={formRef}>
						<div>
							<h6 className='mt-3'>Dados Pessoais</h6>
							{personalDatas.map((p, i) => {
								return (
									<InputCS
										key={i}
										name={p.name}
										className={`w-100 form-control mt-3 `}
										placeholder={p.placeholder}
										readOnly={p.readOnly}
									/>
								);
							})}
						</div>

						<div className='mt-5 '>
							<h6>Endereço</h6>
							{addressDatas.map((a, i) => {
								return (
									<InputCS
										key={i}
										name={a.name}
										placeholder={a.placeholder}
										className={a.className}
										readOnly={a.readOnly}
									/>
								);
							})}
						</div>

						<button className='btn btn-success rounded mt-3 w-50' type='submit'>
							Atualizar
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
};
