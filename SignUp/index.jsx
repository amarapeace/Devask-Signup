import React from 'react';
// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../../../store/AppContext';
// import { LOADING, USER_SIGNED_UP } from '../../../store/actionTypes';
import styles from './styles.module.css';
import Page1 from './Page1';
// import Page2 from './Page2';
// import Page3 from './Page3';
//  import Page4 from './Page4';
// import Page5 from './Page5';
// import Page6 from './Page6';
// import logo from '../../../assets/auth-images/logo.png'
// import connecting from '../../../assets/auth-images/loading.png';
// import congrats from '../../../assets/auth-images/congrats.png';
import topleftcircle from '../../../assets/auth-images/topleftcircle.png'
import midleftcircle from '../../../assets/auth-images/midleftcircle.png'
import toprightblock from '../../../assets/auth-images/toprightblock.png'
import toprightslant from '../../../assets/auth-images/toprightslant.png'
// import {
// 	formInputHandler,
// 	isEmailValid,
// 	useModal,
// 	validateSignUp,
// } from '../utils';
// import AuthModal from '../AuthModal';
// import Button from '../../../components/AuthFormButton';
// import Input from '../Input';
// import styles from './styles.module.css';

function SignUp() {
	// 	const [input, setInput] = useState({
	// 		username: '',
	// 		email: '',
	// 		email_verification_code: '',
	// 		password: '',
	// 		confirmPassword: '',
	// 	});

	// form errors
	// const [errors, setErrors] = useState({});
	// const [serverResponse, setServerResponse] = useState('');

	// const {
	// 	dispatch,
	// 	// state: { loading },
	// } = useContext(AppContext);
	// const navigate = useNavigate();

	// // const { modal, showModal } = useModal();

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	dispatch({
	// 		type: LOADING,
	// 		payload: true,
	// 	});

	// 	const formErrors = validateSignUp(input);

	// 	if (!formErrors) {
	// 		try {
	// 			const { data } = await axios.post(
	// 				'https://api.devask.hng.tech/auth/signup',
	// 				input
	// 			);

	// 			if (data.status_code && data.status_code === 400) {
	// 				setServerResponse(
	// 					data?.detail?.msg || 'server error, please try again later'
	// 				);
	// 				showModal();
	// 				dispatch({
	// 					type: LOADING,
	// 					payload: false,
	// 				});
	// 				return;
	// 			}

	// 			setServerResponse(data?.Message);
	// 			showModal();

	// 			localStorage.setItem('user', JSON.stringify(data.data));
	// 			localStorage.setItem('token', data.Token);

	// 			dispatch({
	// 				type: USER_SIGNED_UP,
	// 				payload: data,
	// 			});
	// 			dispatch({
	// 				type: LOADING,
	// 				payload: false,
	// 			});

	// 			navigate('/');
	// 			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	// 		} catch (error) {
	// 			setServerResponse(
	// 				error?.response?.data?.detail ||
	// 					'server error, please try again later'
	// 			);
	// 			showModal();
	// 			dispatch({
	// 				type: LOADING,
	// 				payload: false,
	// 			});
	// 		}
	// 	} else {
	// 		setErrors(formErrors);
	// 		dispatch({
	// 			type: LOADING,
	// 			payload: false,
	// 		});
	// 	}
	// };

	// const handleVerification = async () => {
	// 	if (!isEmailValid(input.email)) {
	// 		setErrors((prev) => ({
	// 			...prev,
	// 			email: `please enter a valid email address`,
	// 		}));
	// 	} else {
	// 		const { data } = await axios.post(
	// 			'https://api.devask.hng.tech/auth/send_email_code',
	// 			{ email: input.email }
	// 		);

	// 		setServerResponse(data.msg);
	// 		showModal();
	// 	}
	// };

	// const [components, setComponents] = useState([Page1]);
	// const [componentNames, setComponentNames] = useState([
	// 	 Page2,
	// 	 Page3,
	// 	 Page4,
	// 	Page5,
	// ]);

	// function addComponent() {
	// 	if (componentNames.length > 0) {
	// 		setComponents([componentNames[0]]);
	// 		componentNames.splice(0, 1);
	// 	} else {
	// 		//   window.alert("No more planets to add!");
	// 	}

		return (
			<>
				{/* {modal && <AuthModal text={serverResponse} />} */}
				<div className={styles.formexternal}>
					<form className={styles.signup}>
					<img src={topleftcircle} alt="" className={styles.topleft}/>
					<img src={midleftcircle} alt="" className={styles.midleft}/>
					<img src={toprightblock} alt="" className={styles.topblock}/>
					<img src={toprightslant} alt="" className={styles.topslant}/>
						 <div className={styles.formmargin1}>
							 <Page1 /> </div>
							{/* <div className={styles.formmargin2}> *
								<Page2 />
							 </div> */}
						{/* <div className={styles.formmargin3}>
								<Page3 />
							</div> */}
						{/* <div className={styles.formmargin4}>
							<Page4 />
						</div> */}
					</form>
				</div>
				{/* <div className={styles.formmargin5}>
					<Page5 />
				</div> */}
				{/* <div className={styles.formmargin6}>
							<Page6 /></div>  */}
			</>
		);
	}


export default SignUp;
