import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CompressedLayout from "./layouts/CompressedLayout";
import Login from "./pages/Login";
import PickemsDashboard from "./pages/Pickems";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./components/navigation/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import useAuth from "./hooks/useAuth";
import CreateLeague from "./features/pickems/components/CreateLeague";

function App() {
	useAuth();
	const hostname = window.location.hostname;
	const isSubdomain = hostname.startsWith("app.");

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
										<PickemsDashboard />
									</DashboardLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path='/create-a-league'
							element={
								<ProtectedRoute>
									<DashboardLayout>
										<CreateLeague />
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
						{/* Add other routes for the main domain */}
					</>
				)}
			</Routes>
		</>
	);
}

export default App;
