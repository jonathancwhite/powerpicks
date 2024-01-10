import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CompressedLayout from "./layouts/CompressedLayout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
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
			</Routes>
		</>
	);
}

export default App;
