import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:34840/api/employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(emp_id){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:34840/api/employee/'+emp_id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, emp_id,emp_first_name,emp_last_name,phone_number,hire_date}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>HireDate</th>
                        <th>PhoneNumber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.first_name}</td>
                                <td>{emp.last_name}</td>
                                <td>{emp.hire_date.split("T")[0]}</td>
                                <td>{emp.phone_number}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        emp_id:emp.id,
        emp_first_name:emp.first_name,
        emp_last_name:emp.last_name,
        phone_number:emp.phone_number,
        hire_date:emp.hire_date.split("T")[0]})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.id)}>
            Delete
        </Button>

        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        emp_id={emp_id}
        emp_first_name={emp_first_name}
        emp_last_name={emp_last_name}
        phone_number={phone_number}
        hire_date={hire_date}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}