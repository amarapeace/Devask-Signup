import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../store/AppContext';
import { LOADING, USER_SIGNED_UP } from '../../../store/actionTypes';
import logo from '../../../assets/auth-images/logo.png';

import {
	formInputHandler,
	// isEmailValid,
	useModal,
	validateSignUp,
} from '../utils';
import AuthModal from '../AuthModal';
import Button from '../../../components/AuthFormButton';
import Input from '../Input';
import styles from './styles.module.css';

function SignUp() {
	const [input, setInput] = useState({
		username: '',
		email: '',
		email_verification_code: '',
		password: '',
		confirmPassword: '',
	});

	// form errors
	const [errors, setErrors] = useState({});
	const [serverResponse, setServerResponse] = useState('');

	const {
		dispatch,
		state: { loading },
	} = useContext(AppContext);
	const navigate = useNavigate();

	const { modal, showModal } = useModal();

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch({
			type: LOADING,
			payload: true,
		});

		const formErrors = validateSignUp(input);

		if (!formErrors) {
			try {
				const { data } = await axios.post(
					'https://api.devask.hng.tech/auth/signup',
					input
				);

				if (data.status_code && data.status_code === 400) {
					setServerResponse(
						data?.detail?.msg || 'server error, please try again later'
					);
					showModal();
					dispatch({
						type: LOADING,
						payload: false,
					});
					return;
				}

				setServerResponse(data?.Message);
				showModal();

				localStorage.setItem('user', JSON.stringify(data.data));
				localStorage.setItem('token', data.Token);

				dispatch({
					type: USER_SIGNED_UP,
					payload: data,
				});
				dispatch({
					type: LOADING,
					payload: false,
				});

				navigate('/');
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			} catch (error) {
				setServerResponse(
					error?.response?.data?.detail ||
						'server error, please try again later'
				);
				showModal();
				dispatch({
					type: LOADING,
					payload: false,
				});
			}
		} else {
			setErrors(formErrors);
			dispatch({
				type: LOADING,
				payload: false,
			});
		}
	};

	

	return (
		<>
			{modal && <AuthModal text={serverResponse} />}

			

			{/* Third form */}
			<form className={styles.signup} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<img src={logo} alt="" />
					<h3>Continue Sign Up</h3>
				</div>
				<div className={styles.input}>
					<div>
						<Input
							id="firstname"
							label="Firstname"
							name="firstname"
							placeholder="Firstname"
							type="text"
							value={input.firstname}
							handleInputChange={(event) =>
								formInputHandler(event, setErrors, setInput)
							}
							error={errors && errors.firstname}
						/>
					</div>{' '}
					<div>
						<Input
							id="lastname"
							label="Lastname"
							name="lastname"
							placeholder="Lastname"
							type="text"
							value={input.lastname}
							handleInputChange={(event) =>
								formInputHandler(event, setErrors, setInput)
							}
							error={errors && errors.lastname}
						/>
					</div>{' '}
					<div>
						<Input
							id="username"
							label="Username"
							name="username"
							placeholder="Username"
							type="text"
							value={input.username}
							handleInputChange={(event) =>
								formInputHandler(event, setErrors, setInput)
							}
							error={errors && errors.username}
						/>
					</div>{' '}
					<div className={styles.btn}>
						<Button label={loading ? 'please wait' : 'NEXT'} />
					</div>
				</div>
			</form>

			
			

			
		</>
	);
}

export default SignUp;
