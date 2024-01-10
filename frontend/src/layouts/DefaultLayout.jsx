import Footer from "../Footer";
import Header from "../Header";

const DefaultLayout = ({ children }) => {
	return (
		<>
			<Header />
			<main className='body'>{children}</main>
			<Footer />
		</>
	);
};

export default DefaultLayout;
