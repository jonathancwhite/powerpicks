import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import HomePage from "./components/HomePage";

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<DefaultLayout>
						<HomePage />
					</DefaultLayout>
				}
			/>
			{/* <Route
				path='/leagues'
				element={
					<DefaultLayout>
						<LeaguePage />
					</DefaultLayout>
				}
			/> */}
		</Routes>
	);
}

export default App;
