import './App.css';
import { Routes, Route, BrowserRouter, Router} from 'react-router-dom'
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';
import Detail from './Views/Detail/Detail';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/detail/id' element={<Detail/>} />
        </Routes>
      </div>
    </Router>
  )
};

export default App;
