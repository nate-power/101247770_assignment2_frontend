import React, { useEffect, useState } from 'react'
import { Alert, Container, Button, Form, FloatingLabel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';

export default function EditEmployee() {

    const EMPLOYEE = {
        firstName: undefined,
        lastName: undefined,
        emailId: undefined,
    }

    const [show, setShow] = useState(false);
    const [employee, setEmployee] = useState(EMPLOYEE)
    const { id } = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:9090/api/v1/employees/${id}`)
        .then((response) => response.json())
        .then((json) => {
            setEmployee(json);           
        });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let employee = {
            firstName: event.currentTarget.firstName.value,
            lastName: event.currentTarget.lastName.value,
            emailId: event.currentTarget.emailId.value
        }          
        fetch(`http://localhost:9090/api/v1/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
        })
        .then(setShow(true));   
    }
    return (
        <div>
            <Container>
                <h1 className="text-center">Edit Employee</h1>  
                <Alert show={show} variant="success">
                    <Alert.Heading>Employee Edited!</Alert.Heading>
                    <p>
                    You can click the button on the far right to go back to the list of employees.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                    <NavLink to="/" style={{color: "#FFFFFF", textDecoration: "none"}}><Button variant="outline-success">Back to Item Library</Button></NavLink>
                    </div>
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <FloatingLabel style={{color: "#2C2C2C"}} label="First Name">
                            <Form.Control type="text" placeholder="First Name" name="firstName" defaultValue={employee[0]?.firstName} required/>
                        </FloatingLabel>
                        <Form.Text className="text-light">
                        Edit the employee's first name.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <FloatingLabel style={{color: "#2C2C2C"}} label="Last Name">
                            <Form.Control type="text" placeholder="Last Name" name="lastName" defaultValue={employee[0]?.lastName} required/>
                        </FloatingLabel>
                        <Form.Text className="text-light">
                        Edit the employee's last name.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <FloatingLabel style={{color: "#2C2C2C"}} label="Email Id">
                            <Form.Control type="email" placeholder="Email Id" name="emailId" defaultValue={employee[0]?.emailId} required/>
                        </FloatingLabel>                        
                        <Form.Text className="text-light">
                        Edit the employee's email in a valid format (e.g. test@test.com).
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="submit">
                    
                    <Button variant="success" type="submit" size="lg" style={{float: 'right'}}>
                        Edit Employee
                    </Button>
                    <NavLink to="/" style={{color: "#FFFFFF", textDecoration: "none"}}><Button className="mx-2" variant="danger" size="lg" style={{float: 'right'}}>Cancel</Button></NavLink>
                    </Form.Group>                    
                </Form>
            </Container>
        </div>
    )
}
