import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:34840/api/employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password: event.target.PasswordHash.value,
                first_name: event.target.EmployeeFirstName.value,
                last_name: event.target.EmployeeLastName.value,
                hire_date: event.target.HireDate.value,
                phone_number: event.target.PhoneNumber.value
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }




    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="PasswordHash">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" name="PasswordHash" required 
                        placeholder="Password"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeFirstName">
                        <Form.Label>Employee First Name</Form.Label>
                        <Form.Control type="text" name="EmployeeFirstName" required 
                        placeholder="Employee First Name"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeLastName">
                        <Form.Label>Employee Last Name</Form.Label>
                        <Form.Control type="text" name="EmployeeLastName" required 
                        placeholder="Employee Last Name"/>
                    </Form.Group>

                    <Form.Group controlId="HireDate">
                        <Form.Label>Hire Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="HireDate"
                        required
                        placeholder="Hire Date"
                        />
                    </Form.Group>

                    <Form.Group controlId="PhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="Phone Number" required 
                        placeholder="EmployeeName"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Employee
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}