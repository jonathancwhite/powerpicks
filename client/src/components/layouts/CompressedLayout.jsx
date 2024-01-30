import Header from "../common/Header";

const CompressedLayout = ({ children, newAccount }) => {
	return (
		<div className='app'>
			<Header compressed={true} newAccount={newAccount} />
			<main className='body'>{children}</main>
		</div>
	);
};

export default CompressedLayout;
