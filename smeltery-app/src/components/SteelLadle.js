import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {EditSteelLadleModal} from './EditSteelLadleModal';
import {InfoSteelLadleModal} from './InfoSteelLadleModal';
import {HistorySteelLadleModal} from './HistorySteelLadleModal';
export class SteelLadle  extends Component{

    constructor(props){
        super(props);
        this.state={steelLadles:[],workshopConverters:[], workshopUNRSs:[], listOfHistory:[],steelLadleAfterMelting:[], addModalShow:false, editModalShow:false, infoModalShow:false, historyModalShow:false}
    }

    

    refreshList(){
        fetch('http://localhost:34840/api/SteelLadle')
        .then(response=>response.json())
        .then(data=>{
            this.setState({steelLadles:data});
        });

        fetch('http://localhost:34840/api/WorkshopUNRS')
        .then(response=>response.json())
        .then(data=>{
            this.setState({workshopUNRSs:data});
        });

        fetch('http://localhost:34840/api/WorkshopConverter')
        .then(response=>response.json())
        .then(data=>{
            this.setState({workshopConverters:data});
        });

        fetch('http://localhost:34840/api/SteelLadleAfterMelting')
        .then(response=>response.json())
        .then(data=>{
            this.setState({steelLadleAfterMelting:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {steelLadles,ladle, steelLadle_id, workshopConverters, workshopUNRSs, steelLadleAfterMelting}=this.state;
        let editModalClose=()=>this.setState({editModalShow:false});
        let infoModalClose=()=>this.setState({infoModalShow:false});
        let historyModalClose=()=>this.setState({historyModalShow:false});
        return (
            <div>
            <ButtonToolbar>

            <EditSteelLadleModal
                show={this.state.editModalShow}
                onHide={editModalClose}
                steelLadle_id = {steelLadle_id}
                ladle = {ladle}
            />
            <InfoSteelLadleModal
                show={this.state.infoModalShow}
                onHide={infoModalClose}
                steelLadle_id = {steelLadle_id}
                ladle = {ladle}
            />
            <HistorySteelLadleModal
                show={this.state.historyModalShow}
                onHide={historyModalClose}
                steelLadle_id = {steelLadle_id}
                ladle = {ladle}
            />
            </ButtonToolbar>
                <div style={{ height: '50vh', display: 'flex' }}>
                    <div style={{ width: '20%', float: 'left', overflow: 'auto' }}>
                    <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th colSpan={2}>Цех Выплавки стали</th>
                        </tr>
                    </thead>
                    <tbody>
                    {workshopConverters.map((workshopConverter) => (
                        <React.Fragment key={workshopConverter.converter_id}>
                            <tr>
                                <td style={{ maxWidth: '20px'}}></td>
                                <td style={{ maxWidth: '20px'}}><b>Конвертер {workshopConverter.converter_id}</b></td>
                            </tr>
                            <tr>
                                <td>Плавка №</td>
                                <td>{workshopConverter.melt_id}</td>
                            </tr>
                            <tr>
                                <td>Начало</td>
                                <td>{workshopConverter.start_time}</td>
                            </tr>
                            <tr>
                                <td>Марка</td>
                                <td>{workshopConverter.steel_grade}</td>
                            </tr>
                        </React.Fragment>
                        ))}
                    </tbody>
                    </Table>
                    </div>
                    <div style={{ width: '50%', float: 'left',overflow: 'auto' }}>
                        <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>id СК</th>
                                <th>С</th>
                                <th>П</th>
                                <th>К</th>
                                <th>сост.</th>
                                <th>Вес</th>
                                <th>Текущее состояние СК</th>
                            </tr>
                        </thead>
                        <tbody>
                        {steelLadles.map((steelLadle) => (
                        <tr key={steelLadle.id}>
                            <td>{steelLadle.id}</td>
                            <td>{steelLadle.cup}</td>
                            <td>{steelLadle.plate}</td>
                            <td>{steelLadle.collector}</td>
                            <td>{steelLadle.state}</td>
                            <td>{steelLadle.weight}</td>
                            <td>{steelLadle.characteristic}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                    className="mr-2"
                                    variant="info"
                                    onClick={() => this.setState(
                                        { infoModalShow: true,
                                            ladle : steelLadle,
                                            steelLadle_id : steelLadle.id
                                        
                                        })}>
                                    info
                                </Button>

                                <Button 
                                className="mr-2"
                                variant="info"
                                onClick={() => {
                                    this.setState({
                                        historyModalShow: true,
                                        steelLadle_id: steelLadle.id,
                                        history : this.state.listOfHistory
                                    });
                                }}
                                >
                                    history
                                </Button>
                                <Button className="mr-2"
                                variant="info" 
                                onClick={() => this.setState(
                                    { editModalShow: true,
                                        ladle : steelLadle,

                                    
                                    })}>
                                    edit
                                </Button>
                            </ButtonToolbar>
                            </td>
                        </tr>
                        ))}

                        </tbody>
                        </Table>
                    </div>
                    <div style={{ width: '30%', float: 'left', overflow: 'auto' }}>
                    <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th colSpan={2}>Цех разлива стали на УНРС</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workshopUNRSs.map((workshopUNRS) => (
                        <React.Fragment key={workshopUNRS.UNRS_id}>
                            <tr>
                                <td><b>Плавка № {workshopUNRS.melt_id}</b></td>
                                <td><b>УНРС {workshopUNRS.UNRS_id}</b></td>
                            </tr>
                            <tr>
                                <td>Прогноз окончания</td>
                                <td>{workshopUNRS.end_time}</td>
                            </tr>
                            <tr>
                                <td>СК </td>
                                <td>{workshopUNRS.ladle_id}</td>
                            </tr>
                        </React.Fragment>
                            ))}
                    </tbody>
                    </Table>
                </div>

                <div style={{ position: 'fixed', bottom: 0, overflow: 'auto' }}>
                    {steelLadleAfterMelting.map((AfterMelting) =>(
                        <div style={{float: 'left', overflow: 'auto' }}>
                        <React.Fragment key={AfterMelting.ladle_id}>
                            <Table className="mt-6" striped bordered hover size="sm" >
                                <div style={{margin:'10px'}}>
                                    <tr>
                                        <td><b>Плавка № {AfterMelting.melt_id}</b></td>
                                        <td><b>СК {AfterMelting.ladle_id}</b></td>
                                    </tr>
                                    <tr>
                                        <td>хим анализ</td>
                                        <td>
                                            C: {AfterMelting.C} 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            Si:{AfterMelting.Si}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td>
                                            Ti:{AfterMelting.Ti}
                                        </td>
                                    </tr>

                                    
                                    <tr>
                                        <td>т. прод. блоков</td>
                                        <td>

                                            Л-1:{AfterMelting.L_1}                              
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>

                                             Л-2:{AfterMelting.L_2}                
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>

                                            Л-3:{AfterMelting.L_3}                                    
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>т. пробок (пасп.): </td>
                                        <td>{AfterMelting.shelft_hickness}</td>
                                    </tr>
                                    <tr>
                                        <td>толщина шлака</td>
                                        <td>{AfterMelting.slag_thickness}</td>
                                    </tr>
                                    <tr>
                                        <td>ПШ</td>
                                        <td>{AfterMelting.PS}</td>
                                    </tr>
                                    <tr>
                                        <td>Зарощ.</td>
                                        <td>{AfterMelting.grove}</td>
                                    </tr>
                                </div>

                            </Table>
                        </React.Fragment>

                        </div>
                    
                    ))}
                </div>

                </div>
            </div>
          );
    }
}