import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import CompressedLayout from "./components/layouts/CompressedLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import LeagueInvite from "./pages/LeagueInvite";
import Dashboard from "./pages/Dashboard";
import ActiveLeagues from "./pages/Leagues";
import UserLeagues from "./pages/UserLeagues";
import AccountSettings from "./pages/AccountSettings";
import ProfileSettings from "./pages/ProfileSettings";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/navigation/ProtectedRoute";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
	let isLoading = useAuth();
	const hostname = window.location.hostname;
	const isSubdomain = hostname.startsWith("app.");
	let toastOptions = {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: 2,
		theme: "dark",
	};

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
			<ToastContainer {...toastOptions} />
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
							path='/leagues/:id'
							element={
								<ProtectedRoute>
									<DashboardLayout>
										<UserLeagues />
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
						<Route
							path='/invite/:code'
							element={
								<CompressedLayout>
									<LeagueInvite />
								</CompressedLayout>
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
