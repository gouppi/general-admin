import "./styles/App.scss";
import Navigation from "./components/Navigation";

import {Router} from "@reach/router";

import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

function App() {
	return (
		<div className="App">
			<Navigation />
			
			<Router>
				<Landing path="/" />
				<Settings path="/settings" />
				<Users path="/users" />
			</Router>
		</div>
	);
}

export default App;
