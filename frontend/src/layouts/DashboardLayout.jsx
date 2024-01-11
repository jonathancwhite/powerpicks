import DashboardHeader from "../components/navigation/DashboardHeader";

const DashboardLayout = ({ children }) => {
	return (
		<div className='pickemsApp'>
			<DashboardHeader />
			<main className='body'>{children}</main>
		</div>
	);
};

export default DashboardLayout;
