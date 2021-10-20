import {RouteComponentProps} from "@reach/router";
import {Container, Table,Button,Form} from "react-bootstrap";
import {useEffect, useCallback, useState} from 'react';

import {UserType, UserTypePost} from '../datatypes/User'


const Users = (props: RouteComponentProps) => {

	// Incoming posts from GET request, shown in HTML table
	const [users, setUsers] = useState<UserType[]|undefined>(undefined);

	// Outgoing form data for new "user" record, has different fields compared to incoming UserType (e.g. password is hidden)
	const [formData, setFormData] = useState<UserTypePost>({
		username: "",
		email: "",
		password: ""
	});

	// Memoized callback function to fetch all users from mongo. To be displayed in html table.
	const getUsers = useCallback(() => {
		fetch("/users", {
			headers: {
				"Content-type": "application/json",
				"Accept": "application/json"
			},
		}).then(res => res.json())
		.then(data => setUsers(data.data))
	}, []);

	// Memoized callback function triggered on form button click. Not a submit button, prevents default automatically.
	const postFormData = useCallback(() => {
		let data = JSON.stringify(formData);
		fetch("/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Accept": "application/json"
			},
			body: data
		}).then(res => res.json())
		.then(() => getUsers())
	}, [formData, getUsers]);

	// How to initially fetch the GET users data other than using an effect hook here?
	useEffect(() => getUsers(), [getUsers]);
	

return (
	<Container>
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Username</th>
					<th>Email</th>
					<th>CreatedAt</th>
					<th>UpdatedAt</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{users?.map(u => (
					<tr>
						<td>{u._id}</td>
						<td>{u.username}</td>
						<td>{u.email}</td>
						<td>{u.createdAt}</td>
						<td>{u.updatedAt}</td>
						<td><Button variant="danger">Delete</Button></td>
					</tr>
				))}
			</tbody>
		</Table>

		<Form>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email Address</Form.Label>
				<Form.Control name="email" type="email" placeholder="Enter email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicName">
				<Form.Label>Name Field</Form.Label>
				<Form.Control name="username" type="username" placeholder="Enter username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control name="password" type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
			</Form.Group>

			<Button onClick={() => postFormData()} variant="primary" type="button">
				Submit
			</Button>
		</Form>
		
	</Container>
	);
};

export default Users;
