import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
export class InfoSteelLadleModal extends Component{
    

    

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
                              <Form.Control type="text" name="weight"disabled required defaultValue={this.props.ladle.weight}/>
                              <Form.Label className="mr-2 col-2">УНРС</Form.Label>
                              <Form.Control type="text" name="UNRS_id"  disabled defaultValue={this.props.ladle.UNRS_id} />
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-6">Обмыв ковша</Form.Label>
                              <Form.Control type="text" name="ladle_washing"disabled placeholder="" defaultValue={this.props.ladle.ladle_washing}>
                              </Form.Control>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-6">Установка шиберного затвора</Form.Label>
                              <Form.Control type="text" name="shutter_installation"disabled  placeholder="" defaultValue={this.props.ladle.shutter_installation}>
                            
                              </Form.Control>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Засыпка сталеразл. отверстия</Form.Label>
                              <Form.Control type="text" name="hole_filling" disabled  placeholder="" defaultValue={this.props.ladle.hole_filling}>
                              </Form.Control>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-2">Стойкость плавок: </Form.Label>
                              <Form.Control type="text" name="durability" disabled defaultValue={this.props.ladle.durability}/>
                              <Form.Label className="mr-2 col-2">прод. блоков: </Form.Label>
                              <Form.Control type="text" name="blocks" disabled defaultValue={this.props.ladle.blocks}/>
                          </Form.Group>
      
                          <Form.Group className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Стойкость:</Form.Label>
                          </Form.Group>
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-2">стакана: </Form.Label>
                              <Form.Control type="text" name="max_cup" disabled defaultValue={this.props.ladle.max_cup}/>
                              <Form.Label className="mr-2 col-2">плит: </Form.Label>
                              <Form.Control type="text" name="max_plate" disabled defaultValue={this.props.ladle.max_plate}/>
                              <Form.Label className="mr-2 col-2">коллектора: </Form.Label>
                              <Form.Control type="text" name="max_collector"  disabled defaultValue={this.props.ladle.max_collector}/>
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label  className="mr-2 col-4">Состояние</Form.Label>
                              <Form.Control type="text" name="state" disabled defaultValue={this.props.ladle.state}>
                              
                              </Form.Control>                
                          </Form.Group>
      
                          <Form.Group controlId="SteelLadleId" className="d-flex align-items-center">
                              <Form.Label className="mr-2 col-4">Характеристика</Form.Label>
                              <Form.Control type="text" disabled name="characteristic"  
                              placeholder="сharacteristic"
                              defaultValue={this.props.ladle.characteristic}
                              style={{ height: '100px', whiteSpace: 'break-word' }}
                              />             
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