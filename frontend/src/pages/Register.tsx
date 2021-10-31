import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useCallback, useContext, useState } from 'react';
import { UserTypeLogin, UserTypePost } from '../datatypes/User';
import { Error } from '../datatypes/Response';
import { RouteComponentProps, navigate } from '@reach/router';
import GlobalContext from '../context/GlobalContext';
import Response from '../datatypes/Response';

import '../styles/Login.scss';


const Register = (props: RouteComponentProps) => {

    //const {  } = useContext(GlobalContext);
    const [errors, setErrors] = useState<Error[]>([]);

    const [formData, setFormData] = useState<UserTypePost>({
        email: "",
        password: "",
        password2: "",
    });

    const handleRegister = useCallback(async (e) => {
        e.preventDefault();
        setErrors([]);
        let data = JSON.stringify(formData);
        let result = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: data
        });
        let json = await result.json() as Response;
        if (json.statusCode === 200) {
            console.log("SUCCESS");
        } else if (json.errors !== null) {
            setErrors(json.errors);
        }
    }, [formData])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-image" md={6}></Col>
                    <Col md={6} className="login d-flex align-items-center py-5">

                        <Container>
                            <h1>General Admin - Rekisteröidy</h1>
                            <Form className="form-login">
                                <Form.Label className="mt-3">Sähköpostiosoite</Form.Label>
                                <Form.Control isInvalid={errors.find(err => err.param === 'email') as undefined as boolean} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Kirjoita sähköpostiosoite" />

                                {errors.filter(err => err.param === 'email').map((err: Error) => (
                                    <Form.Control.Feedback type="invalid">
                                        {err.msg}
                                    </Form.Control.Feedback>
                                ))}


                                <Form.Label className="mt-3">Salasana</Form.Label>
                                <Form.Control isInvalid={errors.find(err => err.param === 'password') as undefined as boolean} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" placeholder="Salasana" />

                                {errors.filter(err => err.param === 'password').map((err: Error) => (
                                    <Form.Control.Feedback type="invalid">
                                        {err.msg}
                                    </Form.Control.Feedback>
                                ))}

                                <Form.Label className="mt-3">Salasana uudestaan</Form.Label>
                                <Form.Control isInvalid={errors.find(err => err.param === 'password') as undefined as boolean} onChange={(e) => setFormData({ ...formData, password2: e.target.value })} type="password" placeholder="Salasana" />

                                {errors.filter(err => err.param === 'password').map((err: Error) => (
                                    <Form.Control.Feedback type="invalid">
                                        {err.msg}
                                    </Form.Control.Feedback>
                                ))}

                                <Row className="mt-3">
                                    <Col xs={6} >
                                        <Button onClick={(e) => handleRegister(e)} variant="primary" type="submit">
                                            Rekisteröidy
                                        </Button>
                                    </Col>
                                    <Col xs={6} className="d-flex justify-content-end">
                                        <Button onClick={() => navigate('/login')} variant="link" type="button">Kirjaudu täältä</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default Register;