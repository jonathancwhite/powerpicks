import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import DefaultLayout from "./components/layouts/DefaultLayout";

function App() {
	return (
		<Router>
			<DefaultLayout>
				<Routes>
					<Route path='/' exact element={HomePage} />
					{/* <Route path='/leagues' element={LeaguesPage} />
				<Route path='/account' element={AccountPage} />

				<Route
					path={["/sign-up", "/log-in"]}
					element={SignUpLoginPage}
				/>

				<Route element={NotFoundPage} /> */}
				</Routes>
			</DefaultLayout>
		</Router>
	);
}

export default App;
