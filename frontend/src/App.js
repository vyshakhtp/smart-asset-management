import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Inventory from './pages/Inventory';
import Ticket from './pages/Ticket';
import Profile from './pages/Profile';
import Layout from './component/Layout';
import Chat from './pages/Chat';
function App() {
  return (
    <div className="App">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Layout >
                <Dashboard />
              </Layout>} />
            <Route path="/assets" element={<Layout >
                <Assets />
              </Layout>} />
            <Route path='/inventory' element={<Layout >
                <Inventory />
              </Layout>} />
            <Route path="/ticket" element={<Layout >
                <Ticket />
              </Layout>} />
            <Route path="/profile" element={<Layout >
                <Profile />
              </Layout>} />
              <Route path="/chat" element={<Layout >
                <Chat />
              </Layout>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
