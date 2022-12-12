import React from 'react';

import connecting from '../../../assets/auth-images/loading.png';

function SignUp() {
	

	return (
		<>
			{/* {modal && <AuthModal text={serverResponse} />} */}

			
			

			<div>
				<img src={connecting} alt="" />
			</div>
			
		</>
	);
}

export default SignUp;
