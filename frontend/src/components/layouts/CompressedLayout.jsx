import React from "react";
import HeaderCompressed from "../HeaderCompressed";

const CompressedLayout = ({ children }) => {
	return (
		<>
			<HeaderCompressed />
			<main className='body'>{children}</main>
		</>
	);
};

export default CompressedLayout;
