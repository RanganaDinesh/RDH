import './App.css';
import Header from './components/Headers'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import MenuList from './components/MenuList';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Header />} />       {/* Main or Welcome page */}
        <Route path="/dashboard/:code" element={<Dashboard />} /> {/* Dashboard route */}
        <Route path="/menu" element={<Menu />} />           {/* Menu route */}
        <Route path="/menulist/:code" element={<MenuList />} />           {/* Menu route */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
