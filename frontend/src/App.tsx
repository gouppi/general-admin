import "./styles/App.scss";

import {GlobalContextProvider} from './context/GlobalContext';
import {Router} from "@reach/router";

import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Login from './pages/Login';
import Register from './pages/Register';

import Loading from './pages/Loading';

function App() {
	return (
		<div className="App">
			<GlobalContextProvider>
				
				<Router>
					<Landing path="/" />
					<Settings path="/settings" />
					<Users path="/users" />
					<Login path="/login" />
					<Register path="/register"/>
				</Router>

			<Loading />

			</GlobalContextProvider>
		</div>
	);
}

export default App;
