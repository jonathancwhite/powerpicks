import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CompressedLayout from "./layouts/CompressedLayout";
import Login from "./pages/Login";
import Dashboard from "./features/pickems/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./components/navigation/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import useAuth from "./hooks/useAuth";
import ActiveLeagues from "./features/pickems/pages/ActiveLeagues";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Logout from "./pages/Logout";
import AccountSettings from "./features/pickems/pages/settings/accountSettings";
import Settings from "./features/pickems/pages/settings/Settings";
import ProfileSettings from "./features/pickems/pages/settings/ProfileSettings";

function App() {
	const isLoading = useAuth();
	const hostname = window.location.hostname;
	const isSubdomain = hostname.startsWith("app.");

	if (isLoading) {
		return (
			<DefaultLayout>
				<div className='container'>
					<LoadingSpinner />
				</div>
			</DefaultLayout>
		);
	}

	return (
		<>
			<ToastContainer />
			<Routes>
				{isSubdomain ? (
					<>
						<Route
							path='/'
							element={
								<ProtectedRoute>
									<DashboardLayout>
										<Dashboard />
									</DashboardLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path='/leagues'
							element={
								<ProtectedRoute>
									<DashboardLayout>
										<ActiveLeagues />
									</DashboardLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path='/settings/account'
							element={
								<ProtectedRoute>
									<DashboardLayout>
										<Settings>
											<AccountSettings />
										</Settings>
									</DashboardLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path='/settings/profile'
							element={
								<ProtectedRoute>
									<DashboardLayout>
										<Settings>
											<ProfileSettings />
										</Settings>
									</DashboardLayout>
								</ProtectedRoute>
							}
						/>
					</>
				) : (
					<>
						<Route
							path='/'
							element={
								<DefaultLayout>
									<Home />
								</DefaultLayout>
							}
						/>
						<Route
							path='/sign-up'
							element={
								<CompressedLayout newAccount={true}>
									<Signup />
								</CompressedLayout>
							}
						/>
						<Route
							path='/login'
							element={
								<CompressedLayout>
									<Login />
								</CompressedLayout>
							}
						/>
						<Route
							path='/logout'
							element={
								<DefaultLayout>
									<Logout />
								</DefaultLayout>
							}
						/>
						{/* Add other routes for the main domain */}
					</>
				)}
			</Routes>
		</>
	);
}

export default App;
