import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";

const DefaultLayout = ({ children }) => {
	return (
		<div className='app'>
			<Header />
			<main className='body'>{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
