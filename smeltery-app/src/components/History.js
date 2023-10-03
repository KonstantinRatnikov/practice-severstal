import React, { useEffect, useState } from 'react';

import {Container, Row, Col, Dropdown } from 'react-bootstrap';

export const History = ({url})=>
{
  const [history, setHistory] = useState([]);

  const [selectedItems, setSelectedItems] = useState(() => [...history.map(item => item.id_steelLadle)]);
  const [selectedMeltIds, setSelectedMeltIds] = useState(() => [...history.map(item => item.melt_id)]);

  const [selectedUNRSId, setSelectedUNRSId] = useState(() => [...history.map(item => item.UNRS_id)]);
  const [selectedSteelGrade, setSelectedMeltSteelGrade] = useState(() => [...history.map(item => item.steel_grade)]);
  const [selectedState, setSelectedState] = useState(() => [...history.map(item => item.state)]);
  const [selectedWeight, setSelectedWeight] = useState(() => [...history.map(item => item.weight)]);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(() => [...history.map(item => item.characteristic)]);
  const [selectedStartTime, setSelectedStartTime] = useState(() => [...history.map(item => item.start_time)]);


  const [selectedDurability, setSelectedDurability] = useState(() => [...history.map(item => item.durability)]);
  const [selectedBlocks, setSelectedBlocks] = useState(() => [...history.map(item => item.blocks)]);
  const [selectedLadleWashing, setSelectedLadleWashing] = useState(() => [...history.map(item => item.ladle_washing)]);
  const [selectedShutterInstallation, setSelectedShutterInstallation] = useState(() => [...history.map(item => item.shutter_installation)]);
  const [selectedHoleFilling, setSelectedHoleFilling] = useState(() => [...history.map(item => item.hole_filling)]);

  useEffect(() => {
    
    fetch('http://localhost:34840/api/History', { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
      .then(response => response.json())
      .then(data => {
        setHistory([...data, ...data]);
        setSelectedItems(prevSelectedItems => [...prevSelectedItems, ...data.map(item => item.id_steelLadle)]);
        setSelectedMeltIds(prevSelectedItems => [...prevSelectedItems, ...data.map(item => item.melt_id)]);
        setSelectedUNRSId(prevSelectedUNRSId => [...prevSelectedUNRSId, ...data.map(item => item.UNRS_id)]);
        setSelectedMeltSteelGrade(prevSelectedSteelGrade => [...prevSelectedSteelGrade, ...data.map(item => item.steel_grade)]);
        setSelectedState(prevSelectedState => [...prevSelectedState, ...data.map(item => item.state)]);
        setSelectedWeight(prevSelectedWeight => [...prevSelectedWeight, ...data.map(item => item.weight)]);
        setSelectedCharacteristic(prevSelectedCharacteristic => [...prevSelectedCharacteristic, ...data.map(item => item.characteristic)]);
        setSelectedStartTime(prevSelectedStartTime => [...prevSelectedStartTime, ...data.map(item => item.start_time)]);
        setSelectedDurability(prevSelectedDurability => [...prevSelectedDurability, ...data.map(item => item.durability)]);
        setSelectedBlocks(prevSelectedBlocks => [...prevSelectedBlocks, ...data.map(item => item.blocks)]);
        setSelectedLadleWashing(prevSelectedLadleWashing => [...prevSelectedLadleWashing, ...data.map(item => item.ladle_washing)]);
        setSelectedShutterInstallation(prevSelectedShutterInstallation => [...prevSelectedShutterInstallation, ...data.map(item => item.shutter_installation)]);
        setSelectedHoleFilling(prevSelectedHoleFilling => [...prevSelectedHoleFilling, ...data.map(item => item.hole_filling)]);
      });
  }, []);
  

  const addChecked = ({ id, checked, name }) => {
    console.log(name);
    switch (name) {
      case 'id_steelLadle':
        checked
          ? setSelectedItems([...selectedItems, id])
          : setSelectedItems(selectedItems.filter((item) => item !== id));
        break;
      case 'melt_id':
        checked
          ? setSelectedMeltIds([...selectedMeltIds, id])
          : setSelectedMeltIds(selectedMeltIds.filter((item) => item !== id));
        break;
      case 'UNRS_id':
        checked
          ? setSelectedUNRSId([...selectedUNRSId, id])
          : setSelectedUNRSId(selectedUNRSId.filter((item) => item !== id));
        break;
      case 'steel_grade':
        checked
          ? setSelectedMeltSteelGrade([...selectedSteelGrade, id])
          : setSelectedMeltSteelGrade(selectedSteelGrade.filter((item) => item !== id));
        break;
      case 'state':
        checked
          ? setSelectedState([...selectedState, id])
          : setSelectedState(selectedState.filter((item) => item !== id));
        break;
      case 'weight':
        checked
          ? setSelectedWeight([...selectedWeight, id])
          : setSelectedWeight(selectedWeight.filter((item) => item !== id));
        break;
      case 'characteristic':
        checked
          ? setSelectedCharacteristic([...selectedCharacteristic, id])
          : setSelectedCharacteristic(selectedCharacteristic.filter((item) => item !== id));
        break;
      case 'start_time':
        checked
          ? setSelectedStartTime([...selectedStartTime, id])
          : setSelectedStartTime(selectedStartTime.filter((item) => item !== id));
        break;
        case 'durability':
      checked
        ? setSelectedDurability([...selectedDurability, id])
        : setSelectedDurability(selectedDurability.filter((item) => item !== id));
      break;
    case 'blocks':
      checked
        ? setSelectedBlocks([...selectedBlocks, id])
        : setSelectedBlocks(selectedBlocks.filter((item) => item !== id));
      break;
    case 'ladle_washing':
      checked
        ? setSelectedLadleWashing([...selectedLadleWashing, id])
        : setSelectedLadleWashing(selectedLadleWashing.filter((item) => item !== id));
      break;
    case 'shutter_installation':
      checked
        ? setSelectedShutterInstallation([...selectedShutterInstallation, id])
        : setSelectedShutterInstallation(selectedShutterInstallation.filter((item) => item !== id));
      break;
    case 'hole_filling':
      checked
        ? setSelectedHoleFilling([...selectedHoleFilling, id])
        : setSelectedHoleFilling(selectedHoleFilling.filter((item) => item !== id));
      break;
      default:
        // code block
    }
  };
    
  const filteredHistory =
  history.filter(
    (item) =>
      selectedItems.includes(item.id_steelLadle) &&
      selectedMeltIds.includes(item.melt_id) &&
      selectedUNRSId.includes(item.UNRS_id) &&
      selectedSteelGrade.includes(item.steel_grade) &&
      selectedState.includes(item.state) &&
      selectedWeight.includes(item.weight) &&
      selectedCharacteristic.includes(item.characteristic) &&
      selectedStartTime.includes(item.start_time) &&
      selectedDurability.includes(item.durability) &&
      selectedBlocks.includes(item.blocks) &&
      selectedLadleWashing.includes(item.ladle_washing) &&
      selectedShutterInstallation.includes(item.shutter_installation) &&
      selectedHoleFilling.includes(item.hole_filling)
  );

  return (
    <Container className='m-2'>
    <Row>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.id_steelLadle)]))}
          addChecked={addChecked} 
          name='id_steelLadle'
          title='ID СК'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.melt_id)]))}
          addChecked={addChecked} 
          name='melt_id'
          title='ID плавки'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.UNRS_id)]))}
          addChecked={addChecked} 
          name='UNRS_id'
          title='УНРС'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.steel_grade)]))}
          addChecked={addChecked} 
          name='steel_grade'
          title='марка стали'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.state)]))}
          addChecked={addChecked} 
          name='state'
          title='состояние'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.weight)]))}
          addChecked={addChecked} 
          name='weight'
          title='вес'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.characteristic)]))}
          addChecked={addChecked} 
          name='characteristic'
          title='х-ка'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.start_time)]))}
          addChecked={addChecked} 
          name='start_time'
          title='дата'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.durability)]))}
          addChecked={addChecked} 
          name='durability'
          title='прочность'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.blocks)]))}
          addChecked={addChecked} 
          name='blocks'
          title='блоки'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.ladle_washing)]))}
          addChecked={addChecked} 
          name='ladle_washing'
          title='чистка'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.shutter_installation)]))}
          addChecked={addChecked} 
          name='shutter_installation'
          title='установка затвора'
        />
      </Col>
      <Col>
        <CheckBoxGroup
          ids={Array.from(new Set([...history.map(item=> item.hole_filling)]))}
          addChecked={addChecked} 
          name='hole_filling'
          title='засыпка отверстия'
        />
      </Col>
    </Row>
    <HistoryTable historyData={filteredHistory} />
  </Container>)
}
// TODO: Компоненты, что ниже - вынести в отдельные файлы

const HistoryTable = ({historyData})=>

  historyData
    .sort((a,b)=> a.id_steelLadle - b.id_steelLadle)
    .map((item,idx) =>
      <HistoryItem key={`hi-${item.id_steelLadle}-${idx}`} {...item} />)

const HistoryItem = ({ id_steelLadle, melt_id, UNRS_id, steel_grade, state, weight, characteristic, start_time, durability, blocks, ladle_washing, shutter_installation, hole_filling }) => (
  <Row className='border-bottom border-info'>
    <Col>{id_steelLadle}</Col>
    <Col>{melt_id}</Col>
    <Col>{UNRS_id}</Col>
    <Col>{steel_grade}</Col>
    <Col>{state}</Col>
    <Col>{weight}</Col>
    <Col>{characteristic}</Col>
    <Col>{start_time}</Col>
    <Col>{durability}</Col>
    <Col>{blocks}</Col>
    <Col>{ladle_washing}</Col>
    <Col>{shutter_installation}</Col>
    <Col>{hole_filling}</Col>
  </Row>
);

const CheckBoxGroup = ({ids, addChecked, name, title})=>
  <Row>
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">{title}</Dropdown.Toggle>
      <Dropdown.Menu>{
          ids.map(id =>
            <CheckBoxIdItem key={`ci-${id}`}
              id={id}
              addChecked={addChecked}
              name={name}/>)
        }</Dropdown.Menu>
    </Dropdown>
  </Row>

const CheckBoxIdItem = ({id, addChecked, name }) =>
  <Col>
    <Row>
      <input 
        className='m-2' 
        name={`input-${id}`} 
        type='checkbox'
        defaultChecked={true}
        onChange={e => addChecked({id, checked: e.target.checked, name})}/>
      <label htmlFor={`input-${id}`} className='m-2'>{id}</label>
    </Row>
  </Col>