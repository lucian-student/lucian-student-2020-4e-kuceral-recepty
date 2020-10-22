import React, { Fragment } from 'react';
import StepForm from './stepForm';
import StepDisplay from './stepDisplay';
import IngredientsAndUtensils from './ingredientsAndUtensils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function StepComponent() {
    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <IngredientsAndUtensils />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StepForm />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StepDisplay />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default StepComponent;