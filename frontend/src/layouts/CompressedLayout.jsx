import React from "react";
import HeaderCompressed from "../HeaderCompressed";

const CompressedLayout = ({ children, newAccount }) => {
	return (
		<>
			<HeaderCompressed newAccount={newAccount} />
			<main className='body'>{children}</main>
		</>
	);
};

export default CompressedLayout;
