/* eslint-disable no-unused-vars */
import React from "react";
import { AuthProvider } from "Context/Auth";
import { GlobalProvider } from "Context/Global";
import Main from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
	return (
		<AuthProvider>
			<GlobalProvider>
				<Router>
					<Main />
				</Router>
			</GlobalProvider>
		</AuthProvider>
	);
}

export default App;
