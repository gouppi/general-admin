import {RouteComponentProps} from "@reach/router";
import {Container, Alert, Row, Col, Form, Button} from "react-bootstrap";
import {useCallback, useState} from 'react';
import {UserType} from '../../../backend/src/models/User';

const Landing = (props: RouteComponentProps) => {

	const [formData, setFormData] = useState<UserType>({
		username: "",
		email: "",
		password: ""
	});

	const postFormData = useCallback(() => {
		console.log("USECALLBACK");
		let data = JSON.stringify(formData);
		console.log(data);

		fetch("/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Accept": "application/json"
			},
			body: data
		}).then(res => res.json())
		.then(data => console.log(data))
			
	}, [formData]);
	

return (
	<Container>
		<Row>
			<Col>
				<Alert key="alert_1" variant="success">
					You are looking Landing.tsx now.
				</Alert>
			</Col>
		</Row>
	

		{/* <Row>
			<Col>
				{data?.age}
			</Col>
			<Col>
				{data?.name}
			</Col>
		</Row> */}
	</Container>
	);
};

export default Landing;
