import {RouteComponentProps} from "@reach/router";
import {Container, Alert, Row, Col} from "react-bootstrap";

const Settings = (props: RouteComponentProps) => (
	<Container>
		<Row>
			<Col>
				<Alert key="alert_1" variant="success">
					You are looking Settings.tsx now.
				</Alert>
			</Col>
		</Row>
	</Container>
);

export default Settings;
