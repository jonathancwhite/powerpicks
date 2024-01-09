import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import CompressedLayout from "./components/layouts/CompressedLayout";
import Login from "./components/pages/Login";
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
