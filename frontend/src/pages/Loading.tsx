// TODO: <Spinner animation="border" /> <- 
import { Spinner, Container, Col, Row, Image } from 'react-bootstrap'
import GlobalContext from "../context/GlobalContext";
import { useContext } from 'react';
import '../styles/Loading.scss';
const Loading = () => {
    const { initialCheckDone } = useContext(GlobalContext);
    return (
        <Container fluid className={initialCheckDone ? "loading loading--done" : "loading"} >
            <Row>
                <Col>
                    <Image className="img-responsive loading__logo" src="https://via.placeholder.com/150" alt="Logo" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Spinner animation="border" />
                </Col>
            </Row>
        </Container>
    )
}

export default Loading;