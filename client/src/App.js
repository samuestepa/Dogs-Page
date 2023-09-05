import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Detail from './views/Detail/Detail';
import Form  from './views/Form/Form';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/detail/:id' element={<Detail/>} />
          <Route path='/form' element={<Form/>} /> 
        </Routes>
      </div>
    </Router>
  )
};

export default App;
