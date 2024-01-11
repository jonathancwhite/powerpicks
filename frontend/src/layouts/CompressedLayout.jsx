import HeaderCompressed from "../components/navigation/HeaderCompressed";

const CompressedLayout = ({ children, newAccount }) => {
	return (
		<div className='app'>
			<HeaderCompressed newAccount={newAccount} />
			<main className='body'>{children}</main>
		</div>
	);
};

export default CompressedLayout;
