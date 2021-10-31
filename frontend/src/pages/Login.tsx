import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useCallback, useContext, useState } from 'react';
import { UserTypeLogin } from '../datatypes/User';
import { Error } from '../datatypes/Response';
import { Redirect, RouteComponentProps, navigate } from '@reach/router';
import GlobalContext from '../context/GlobalContext';
import Response from '../datatypes/Response';

import '../styles/Login.scss';


const Login = (props: RouteComponentProps) => {

    const { user, initialCheckDone, isLoggedIn } = useContext(GlobalContext);
    const [errors, setErrors] = useState<Error[]>([]);

    const [formData, setFormData] = useState<UserTypeLogin>({
        email: "",
        password: "",
        rememberMe: false
    });

    const handleLogin = useCallback((e) => {
        e.preventDefault();
        setErrors([]);
        let data = JSON.stringify(formData);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: data
        }).then(res => res.json() as unknown as Response)
            .then(data => {
                if (data.statusCode === 200) {
                    localStorage.setItem("token", data.data);
                    isLoggedIn();
                } else if (data.errors !== null) {
                    let foo = data.errors;
                    setErrors(foo);
                }
            })
    }, [formData, isLoggedIn])

    return (
        <>
            {initialCheckDone && user.isLogged && (<Redirect noThrow to="/" />)}
            <Container fluid>
                <Row>
                    <Col className="bg-image" md={6}></Col>
                    <Col md={6} className="login d-flex align-items-center py-5">

                        <Container>
                            <h1>General Admin - Kirjaudu</h1>
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

                                <Form.Check onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })} className="mt-3" name='rememberCheckbox' type="checkbox" label="Muista minut" />

                                <Row className="mt-3">
                                    <Col xs={6} >
                                        <Button onClick={(e) => handleLogin(e)} variant="primary" type="submit">
                                            Kirjaudu
                                        </Button>
                                    </Col>
                                    <Col xs={6} className="d-flex justify-content-end align-items-center">
                                        <Button onClick={() => navigate('/register')} variant="link" type="button">Rekisteröidy täältä</Button>
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

export default Login;