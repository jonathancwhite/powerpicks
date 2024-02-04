import PropTypes from "prop-types";

const FormGroup = ({ buttons, onClickHandler }) => {
	return (
		<div className='formGroup'>
			{buttons.map(
				(button, index) => (
					<button
						key={index}
						className='btn btn--cta'
						onClick={onClickHandler}
						data-type={button.toLowerCase().split(" ", 1)}>
						{button}
					</button>
				),
				[],
			)}
		</div>
	);
};

FormGroup.propTypes = {
	buttons: PropTypes.array.isRequired,
	onClickHandler: PropTypes.func.isRequired,
};

export default FormGroup;
