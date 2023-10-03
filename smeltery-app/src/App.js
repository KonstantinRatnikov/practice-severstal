//import logo from './logo.svg';
import './App.css';

import {Home} from './components/Home';
import {EmployeeLogin} from  './components/EmlpoyeeLogin';
import {SteelLadle} from './components/SteelLadle';
import {Employee} from './components/Employee';
import {Navigation} from './components/Navigation';
import {History} from './components/History';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div >

    <Navigation/>

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/employee" element={<Employee />} />
      <Route path="/SteelLadle" element={<SteelLadle />} />
      <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
      <Route path="/History" element={<History />} />
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
