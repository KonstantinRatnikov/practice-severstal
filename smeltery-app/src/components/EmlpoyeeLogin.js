import React,{Component} from 'react';
import {Form,Button, Row, Col} from 'react-bootstrap';
import Cookies from 'js-cookie';

export class EmployeeLogin extends Component{

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
    handleSubmit(event){
        const empId = event.target.EmployeeId.value

        event.preventDefault();
        fetch('http://localhost:34840/api/login',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: event.target.EmployeeId.value,
                password: event.target.PasswordHash.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            if(result=== "Вход выполнен"){
                Cookies.set('emloyeeId', empId, { expires: 7 })
                Cookies.set('emloyeeIsLogin', true, { expires: 7 })
            }
        },
        (error)=>{
            alert('Failed');
        })
    }
    
    render(){
        return(
            <div className="mt-5 d-flex justify-content-left">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmployeeId">
                        <Form.Label>Введите идентификационный номер</Form.Label>
                        <Form.Control type="text" name="EmployeeID" required 
                        placeholder="id"/>
                    </Form.Group>

                    <Form.Group controlId="PasswordHash">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="PasswordHash" required 
                        placeholder="Password"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Войти
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}