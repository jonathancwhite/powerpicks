import React from "react";
import HeaderCompressed from "../HeaderCompressed";
import Footer from "../Footer";

const CompressedLayout = ({ children }) => {
	return (
		<>
			<HeaderCompressed />
			<main className='body'>{children}</main>
			<Footer />
		</>
	);
};

export default CompressedLayout;
