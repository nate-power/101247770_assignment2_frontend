import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Modal, Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export default function ListEmployees() {

    const EMPLOYEES = []
    const EMPLOYEE = {
        id: undefined,
        firstName: undefined,
        lastName: undefined
    }
    const [employees, setEmployees] = useState(EMPLOYEES)
    const [isLoading, setIsLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState(EMPLOYEE);  
    
    let count = 1;

    const closeModal = () => setShowDelete(false);
    const confirmDelete = (employee) => {
        setShowDelete(false);
        if (deleteEmployee !== EMPLOYEE && employee.id !== undefined) {
            setIsLoading(true);
            fetch(`http://localhost:9090/api/v1/employees/${employee.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            })
            .then(() => {
                setDeleteEmployee(EMPLOYEE);
                setIsLoading(false);
            })
            
        }        
    }
    const showModal = (employee) => {
        setShowDelete(true);
        setDeleteEmployee(employee);
    }

    useEffect(() => {
        fetch('http://localhost:9090/api/v1/employees')
        .then((response) => response.json())
        .then((json) => {
            setEmployees(json);
            setIsLoading(false);
        })
    }, [deleteEmployee]);

    return (
        <div>
            <Container>          
                <h1 className="text-center">List of Employees</h1>
                {   
                    isLoading
                    ?
                    <Spinner className="spinner" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :                        
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    First Name
                                </th>
                                <th>
                                    Last Name
                                </th>
                                <th>
                                    Email Id
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {                                    
                                employees.map((employee) => 
                                    <tr key={employee.id}>
                                        <td>{count++}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td className="col-width">
                                            <NavLink to={`view-employee/${employee.id}`} style={{color: "#FFFFFF", textDecoration: "none"}}><Button className="mx-2" variant="primary">View</Button></NavLink>
                                            <NavLink to={`edit-employee/${employee.id}`} style={{color: "#FFFFFF", textDecoration: "none"}}><Button className="mx-2" variant="secondary">Edit</Button></NavLink>
                                            <Button className="mx-2" variant="danger" onClick={() => showModal(employee)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td colSpan="5"><h5><NavLink to={"/add-employee"} style={{color: "#FFFFFF"}}>+ Add a new Employee</NavLink></h5></td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </Container>
            <Modal show={showDelete} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Delete '${deleteEmployee.firstName} ${deleteEmployee.lastName}'`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(deleteEmployee)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
