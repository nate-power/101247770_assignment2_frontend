import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Container, ListGroup, Row, Col, Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router';

export default function ViewEmployee() {

    const EMPLOYEE = {
        firstName: undefined,
        lastName: undefined,
        emailId: undefined,
    }
    const [employee, setEmployee] = useState(EMPLOYEE)
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    

    useEffect(() => {
        fetch(`http://localhost:9090/api/v1/employees/${id}`)
        .then((response) => response.json())
        .then((json) => {
            setEmployee(json);
            setIsLoading(false);            
        });
    }, [id]);

    return (
        <div>
            <Container className="flex">
                <h1 className="text-center">Employee Details</h1>
                {
                    isLoading
                    ?
                    <Spinner className="spinner" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <>
                        <ListGroup>                        
                            <ListGroup.Item>
                                <Row>
                                    <Col className="col-lg-2">
                                        <h4>First Name:</h4> 
                                    </Col>
                                    <Col>
                                        <h4 style={{fontWeight: "bold"}}>{employee[0].firstName}</h4>
                                    </Col> 
                                </Row>                               
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col className="col-lg-2">
                                        <h4>Last Name:</h4> 
                                    </Col>
                                    <Col>
                                        <h4 style={{fontWeight: "bold"}}>{employee[0].lastName}</h4>
                                    </Col> 
                                </Row>                               
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col className="col-lg-2">
                                        <h4>Email Id:</h4> 
                                    </Col>
                                    <Col>
                                        <h4 style={{fontWeight: "bold"}}>{employee[0].emailId}</h4>
                                    </Col> 
                                </Row>                               
                            </ListGroup.Item>
                        </ListGroup>
                        <NavLink to={'/'}><Button className="btn-secondary mt-4" size="lg" style={{float: 'right'}}>Back to Employee List</Button></NavLink>                       
                    </>
                }
            </Container>
        </div>
    )
}
