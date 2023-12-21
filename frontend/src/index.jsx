import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/scss/main.scss";
import App from "./App";

const router = createBrowserRouter([
	// Define your route objects here
	// For example:
	{ path: "/", element: <App /> },
]);

ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById("root"),
);
