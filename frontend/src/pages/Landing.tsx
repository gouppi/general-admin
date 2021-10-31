import { RouteComponentProps,Redirect } from "@reach/router";
import { Container, Alert, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import {useContext} from 'react';
import GlobalContext from "../context/GlobalContext";



const Landing = (props: RouteComponentProps) => {
	const {user, initialCheckDone} = useContext(GlobalContext);
	return initialCheckDone && (
		<>
			{user && !user.isLogged && <Redirect noThrow to="/login"/>}
			<Navigation />
			<Container>
				<Row>
					<Col>
						<Alert key="alert_1" variant="success">
							You are looking Landing.tsx now.
						</Alert>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Landing;
