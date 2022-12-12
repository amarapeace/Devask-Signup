import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../store/AppContext';
import { LOADING, USER_SIGNED_UP } from '../../../store/actionTypes';
import logo from '../../../assets/auth-images/logo.png';

import {
	formInputHandler,
	isEmailValid,
	useModal,
	validateSignUp,
} from '../utils';
import AuthModal from '../AuthModal';
// import Button from '../../../components/AuthFormButton';
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
		// state: { loading },
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

	const handleVerification = async () => {
		if (!isEmailValid(input.email)) {
			setErrors((prev) => ({
				...prev,
				email: `please enter a valid email address`,
			}));
		} else {
			const { data } = await axios.post(
				'https://api.devask.hng.tech/auth/send_email_code',
				{ email: input.email }
			);

			setServerResponse(data.msg);
			showModal();
		}
	};

	return (
		<>
			{modal && <AuthModal text={serverResponse} />}

			

			{/* second form */}
			<form className={styles.signup} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<img src={logo} alt="" />
					<h3>Verify your account</h3>
					<p>Please enter the verification code we sent to ja***oe@gmail.com</p>
				</div>
				<div className={styles.input}>
					<div className={styles.verification}>
						<div className={styles.verificationInput}>
							<Input
								label="Verification code"
								id="email_verification_code"
								name="email_verification_code"
								placeholder=""
								type="text"
								value={input.email_verification_code}
								handleInputChange={(event) =>
									formInputHandler(event, setErrors, setInput)
								}
								error={errors && errors.email_verification_code}
							/>
						</div>
						<button
							className={styles.verificationBtn}
							type="button"
							onClick={handleVerification}
						>
							VERIFY & PROCEED
						</button>
					</div>
				</div>
				<div className={styles.bottomText}>
					<p>
						Did not get the mail?{' '}
						<Link className={styles.link} to="/login">
							Resend
						</Link>
					</p>
				</div>
			</form>

			
		</>
	);
}

export default SignUp;
