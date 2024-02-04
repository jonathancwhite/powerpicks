import FormGroup from "./FormGroup";

const ButtonControlBar = ({ name, isOwner, buttons, onClickHandler }) => {
	return (
		<div className={`${name}__controlBar`}>
			{isOwner && (
				<FormGroup buttons={buttons} onClickHandler={onClickHandler} />
			)}
			{!isOwner && (
				<FormGroup
					buttons={buttons.slice(3)}
					onClickHandler={onClickHandler}
				/>
			)}
		</div>
	);
};

export default ButtonControlBar;
