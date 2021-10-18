import "./styles/App.scss";
import Navigation from "./components/Navigation";

import {Router} from "@reach/router";

import Landing from "./pages/Landing";
import Settings from "./pages/Settings";

function App() {
	return (
		<div className="App">
			<Navigation />
			
			<Router>
				<Landing path="/" />
				<Settings path="/settings" />
			</Router>
		</div>
	);
}

export default App;
