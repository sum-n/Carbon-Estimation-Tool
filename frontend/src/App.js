import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Form from './pages/Form';
import Feedback from './pages/Feedback';
import About from './pages/About';

function App () {
  return (
    <Router className="router">
      <nav className='nav'>
        <Link to="/" className='navHome'>Home</Link>
        <Link to="/form" className='navForm'>Form</Link>
        <Link to="/about" className='navAbout'>About</Link>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer className='footer'>
          <p>© 2022 - Higher Education Carbon Footprint Estimating Tool</p>
        </footer>
    </Router>
  );
}

export default App;
