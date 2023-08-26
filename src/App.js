import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; 
import Navfooter from './components/NavFooter'; 
function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Outlet />
      </div>
      <Navfooter />
    </div>     
  );
}

export default App;
