import Sidebar from "../common/Sidebar";

const DashboardLayout = ({ children }) => {
	return (
		<div className='pickemsApp'>
			<Sidebar />
			<main className='body'>{children}</main>
		</div>
	);
};

export default DashboardLayout;
