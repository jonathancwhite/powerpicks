import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";

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
