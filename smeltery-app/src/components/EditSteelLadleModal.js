import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditSteelLadleModal extends Component{
    constructor(props){
        super(props);
        this.state={listOfState:[],
            listOfEmployee:[],
            cupReplacement: 0,
            plateReplacement: 0,
            collectorReplacement: 0
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleCupReplacementChange = (event) => {
        const isChecked = event.target.checked;
        this.setState({ cupReplacement: isChecked ? 0 : 1});
      };
    
      handlePlateReplacementChange = (event) => {
        const isChecked = event.target.checked;
        this.setState({ plateReplacement: isChecked ? 0 : 1 });
      };
    
      handleCollectorReplacementChange = (event) => {
        const isChecked = event.target.checked;
        this.setState({ collectorReplacement: isChecked ? 0 : 1 });
      };

    componentDidMount(){
        fetch('http://localhost:34840/api/ListOfState')
        .then(response=>response.json())
        .then(data=>{
            this.setState({listOfState:data});
        });


        fetch('http://localhost:34840/api/ListOfEmployee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({listOfEmployee:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let cup1 =0; 
        let collector1 =0;
        let plate1 =0;

        if(this.state.cupReplacement ){
            cup1 =this.props.ladle.cup; 
        }

        if(this.state.cupReplacement){
           collector1 = this.props.ladle.collector;
        }

        if(this.state.plateReplacement){
            plate1 = this.props.ladle.plate;
        }

        fetch('http://localhost:34840/api/SteelLadle',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: event.target.steelLadleId.value,
                melt_id: event.target.melt_id.value,
                UNRS_id: event.target.UNRS_id.value,
                steel_grade: event.target.steel_grade.value,
                max_cup: event.target.max_cup.value,
                max_plate: event.target.max_plate.value,
                max_collector: event.target.max_collector.value,
                cup: cup1,
                plate: plate1,
                collector: collector1,
                state: event.target.state.value,
                weight: event.target.weight.value,
                characteristic: event.target.characteristic.value,
                start_time: event.target.start_time.value,
                durability: event.target.durability.value,
                blocks: event.target.blocks.value,
                ladle_washing: event.target.ladle_washing.value,
                shutter_installation: event.target.shutter_installation.value,
                hole_filling: event.target.hole_filling.value
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
        if (typeof this.props.ladle !== 'undefined') {
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
                  Изменить СК
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                  <Col sm={14}>
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="steelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">№СК</Form.Label>
                              <Form.Control type="text" name="steelLadleId" required placeholder="Id СК" disabled defaultValue={this.props.ladle.id} />
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Начало</Form.Label>
                              <Form.Control type="datetime" name="start_time" required disabled placeholder="" defaultValue={this.props.ladle.start_time}/>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-2">Плавка</Form.Label>
                              <Form.Control type="text" name="melt_id" disabled defaultValue={this.props.ladle.melt_id}/>
                              <Form.Label className="mr-2 col-2">Марка</Form.Label>
                              <Form.Control type="text" name="steel_grade" disabled defaultValue={this.props.ladle.steel_grade}/>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-2">Вес</Form.Label>
                              <Form.Control type="text" name="weight" required defaultValue={this.props.ladle.weight}/>
                              <Form.Label className="mr-2 col-2">УНРС</Form.Label>
                              <Form.Control type="text" name="UNRS_id"  disabled defaultValue={this.props.ladle.UNRS_id} />
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-6">Обмыв ковша</Form.Label>
                              <Form.Control as="select" name="ladle_washing" required placeholder="" defaultValue={this.props.ladle.ladle_washing}>
                              {this.state.listOfEmployee.map(state1=>
                                  <option key={state1.Column1}>{state1.Column1}</option>)}
                              </Form.Control>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-6">Установка шиберного затвора</Form.Label>
                              <Form.Control as="select" name="shutter_installation" required placeholder="" defaultValue={this.props.ladle.shutter_installation}>
                              {this.state.listOfEmployee.map(state1=>
                                  <option key={state1.Column1}>{state1.Column1}</option>)}
                              </Form.Control>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Засыпка сталеразл. отверстия</Form.Label>
                              <Form.Control as="select" name="hole_filling" required placeholder="" defaultValue={this.props.ladle.hole_filling}>
                              {this.state.listOfEmployee.map(state1=>
                                  <option key={state1.Column1}>{state1.Column1}</option>)}
                              </Form.Control>
                          </Form.Group>
      
                          <Form.Group className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Замена:</Form.Label>
                          </Form.Group>
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                            <div className="form-group">
                                <Form.Label className="mr-2 col-2">стакана:</Form.Label>
                                <Form.Control type="checkbox" name="cup_replacement" onChange={this.handleCupReplacementChange} />
                            </div>

                            <div className="form-group">
                                <Form.Label className="mr-2 col-2">плит:</Form.Label>
                                <Form.Control type="checkbox" name="plate_replacement" onChange={this.handlePlateReplacementChange} />
                            </div>

                            <div className="form-group">
                                <Form.Label className="mr-2 col-2">коллектора:</Form.Label>
                                <Form.Control type="checkbox" name="collector_replacement" onChange={this.handleCollectorReplacementChange} />
                            </div>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-2">Стойкость плавок: </Form.Label>
                              <Form.Control type="text" name="durability" required defaultValue={this.props.ladle.durability}/>
                              <Form.Label className="mr-2 col-2">прод. блоков: </Form.Label>
                              <Form.Control type="text" name="blocks" required defaultValue={this.props.ladle.blocks}/>
                          </Form.Group>
      
                          <Form.Group className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Стойкость:</Form.Label>
                          </Form.Group>
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-2">стакана: </Form.Label>
                              <Form.Control type="text" name="max_cup" placeholder="" required defaultValue={this.props.ladle.max_cup}/>
                              <Form.Label className="mr-2 col-2">плит: </Form.Label>
                              <Form.Control type="text" name="max_plate" placeholder="" required defaultValue={this.props.ladle.max_plate}/>
                              <Form.Label className="mr-2 col-2">коллектора: </Form.Label>
                              <Form.Control type="text" name="max_collector" placeholder="" required defaultValue={this.props.ladle.max_collector}/>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label  className="mr-2 col-4">Состояние</Form.Label>
                              <Form.Control as="select" name="state" defaultValue={this.props.ladle.state}>
                              {this.state.listOfState.map(state1=>
                                  <option key={state1.state}>{state1.state}</option>)}
                              </Form.Control>                
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Характеристика</Form.Label>
                              <Form.Control type="text" name="characteristic"  
                              placeholder="сharacteristic"
                              defaultValue={this.props.ladle.characteristic}
                              style={{ height: '100px', whiteSpace: 'break-word' }}
                              />             
                          </Form.Group>
      
      
                          <Form.Group>
                              <Button variant="primary" type="submit">
                                  Сохранить
                              </Button>
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
          </Modal.Body>
          
          <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Закрыть</Button>
          </Modal.Footer>
      
      </Modal>
                </div>
            )
          }
          else{
            return(<div className="container"></div>)
          }
    }

}