import React, { Component } from 'react';
import { Modal, Button, Row, Col, Table } from 'react-bootstrap';

export class HistorySteelLadleModal extends Component {
  constructor(props) {
    super(props);
    this.state = { listOfHistory: [] };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.show === false && this.props.show === true) {
        fetch('http://localhost:34840/api/SteelLadleHistory/' + this.props.steelLadle_id)
        .then(response=>response.json())
        .then(data=>{
            this.setState({listOfHistory:data});
        });
    }
  }

  render() {

    if (typeof this.props.history !== 'undefined') {
        return (
            <div className="container"></div>
            )
    }
        else{
            return (
                <div className="container">
                  <Modal
                    {...this.props}
                    size='xl'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    dialogClassName="custom-modal"
                  >
                      <Modal.Header clooseButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                          История изменений СК {this.props.steelLadle_id}
                          </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <Row>
                              <Col sm={20}>
                              <Table>
                          <thead>
                              <tr>
                              <th>id СК</th>
                              <th>id плавки</th>
                              <th>id УНРС</th>
                              <th>Марка</th>
                              <th>С</th>
                              <th>П</th>
                              <th>К</th>
                              <th>Состояние</th>
                              <th>Вес</th>
                              <th>Характеристика</th>
                              <th>Начальное время</th>
                              <th>Прочность</th>
                              <th>Блоки</th>
                              <th>Мойка СК</th>
                              <th>Установка затвора</th>
                              <th>Заполнение отверстия</th>
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.listOfHistory.map((steelLadle) => (
                              <tr key={steelLadle.id_history}>
                                  <td>{steelLadle.id_steelLadle}</td>
                                  <td>{steelLadle.melt_id}</td>
                                  <td>{steelLadle.UNRS_id}</td>
                                  <td>{steelLadle.steel_grade}</td>
                                  <td>{steelLadle.cup}</td>
                                  <td>{steelLadle.plate}</td>
                                  <td>{steelLadle.collector}</td>
                                  <td>{steelLadle.state}</td>
                                  <td>{steelLadle.weight}</td>
                                  <td>{steelLadle.characteristic}</td>
                                  <td>{steelLadle.start_time}</td>
                                  <td>{steelLadle.durability}</td>
                                  <td>{steelLadle.blocks}</td>
                                  <td>{steelLadle.ladle_washing}</td>
                                  <td>{steelLadle.shutter_installation}</td>
                                  <td>{steelLadle.hole_filling}</td>
                              </tr>
                              ))}
                          </tbody>
                          </Table>
                              </Col>
                          </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={this.props.onHide}>
                        Закрыть
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              );
        }
  }
}
