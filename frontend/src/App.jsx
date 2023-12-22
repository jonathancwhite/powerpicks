import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import CompressedLayout from "./components/layouts/CompressedLayout";

function App() {
	return (
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
					<CompressedLayout>
						<Signup />
					</CompressedLayout>
				}
			/>
		</Routes>
	);
}

export default App;
