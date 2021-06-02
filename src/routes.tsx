import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Hello from "./components/Hello";
import Welcome from "./components/Welcome";

import Login from "./views/Login";




function Routes() {
	return (
		<Router>
			{/* <Switch> */}
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/">
				<App>
					<Route exact path="/admin/welcome" component={Welcome} />
					<Route exact path="/admin/hello" component={Hello} />
				</App>
			</Route>
			{/* </Switch> */}
		</Router>
	);
}
export default Routes;

