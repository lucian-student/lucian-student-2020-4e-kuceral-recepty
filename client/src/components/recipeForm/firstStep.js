import React, { Fragment, useRef, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import YourIngredients from './yourIngredients';
import YourUtensils from './yourUtensils';
import RecipeIngredients from './recipeIngredients';
import RecipeUtensils from './recipeUtensils';
import CustomDragLayer from './customDragLayer';
import { useDrop } from 'react-dnd';
import { useWindowDimensions } from '../../utils/dimensions';

function FirstStep({ properties: { setStep } }) {
    const ref = useRef();
    const [scrollState, setScrollState] = useState(0);
    const { height } = useWindowDimensions();
    const [{ isOver }, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop() {
            return true;
        },
        hover(item, monitor) {
            const position = monitor.getClientOffset().y;
            if ((height / 10) > position) {
                if (scrollState !== 4) {
                    setScrollState(4);
                }
                return;
            }
            if ((height / 6) > position) {
                if (scrollState !== 6) {
                    setScrollState(6);
                }
                return;
            }
            if ((height / 4) > position) {
                if (scrollState !== 2) {
                    setScrollState(2);
                }
                return;
            }
            if ((height * 9 / 10) < position) {
                if (scrollState !== 3) {
                    setScrollState(3);
                }
                return;
            }
            if ((height * 5 / 6) < position) {
                if (scrollState !== 5) {
                    setScrollState(5);
                }
                return;
            }
            if ((height * 3 / 4) < position) {
                if (scrollState !== 1) {
                    setScrollState(1);
                }
                return;
            }
            if (scrollState !== 0) {
                setScrollState(0);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });
    useEffect(() => {
        let scrolling;
        if (isOver) {
            switch (scrollState) {
                case 1:
                    scrolling = setInterval(() => {
                        window.scrollBy(0, 1);
                    }, 10);
                    break;
                case 2:
                    scrolling = setInterval(() => {
                        window.scrollBy(0, -1);
                    }, 10);
                    break;
                case 5:
                    scrolling = setInterval(() => {
                        window.scrollBy(0, 4);
                    }, 10);
                    break;
                case 6:
                    scrolling = setInterval(() => {
                        window.scrollBy(0, -4);
                    }, 10);
                    break;
                case 3:
                    scrolling = setInterval(() => {
                        window.scrollBy(0, 10);
                    }, 10);
                    break;
                case 4:
                    scrolling = setInterval(() => {
                        window.scrollBy(0, -10);
                    }, 10);
                    break;
                case 0:
                    console.log('stopped scroll');
                    break;
                default:
                    console.log('somthing broke in scroll');
            }
        }
        return () => {
            clearInterval(scrolling);
        }
    }, [scrollState, isOver])
    drop(ref);
    return (
        <Fragment>
                <div ref={ref}>
                    <Container>
                        <Row>
                            <Col>
                                <YourIngredients />
                            </Col>
                            <Col>
                                <YourUtensils />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <RecipeIngredients />
                            </Col>
                            <Col>
                                <RecipeUtensils />
                            </Col>
                        </Row>
                    </Container>
                    <Button
                        style={{ width: '100%' }}
                        variant='light'
                        onClick={
                            () => { setStep(step => step + 1) }}>
                        Next Step
                </Button>
                    <CustomDragLayer />
                </div>
        </Fragment >
    )
}

export default FirstStep;