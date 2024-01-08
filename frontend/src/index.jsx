import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import "./assets/scss/main.scss";
import App from "./App";

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>,
	document.getElementById("root"),
);
