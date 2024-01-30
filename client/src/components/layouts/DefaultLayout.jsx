import Header from "../common/Header";
import Footer from "../common/Footer";

const DefaultLayout = ({ children }) => {
	return (
		<div className='app'>
			<Header compressed={false} newAccount={false}/>
			<main className='body'>{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
