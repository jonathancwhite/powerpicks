import Login from "../form/Login";

const LoginModal = ({ closeModal }) => {
	const handleModalContentClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div className='modal'>
			<div className='modal-backdrop' onClick={closeModal}>
				<div className='modal-item' onClick={handleModalContentClick}>
					<div className='login-modal'>
						<Login />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
