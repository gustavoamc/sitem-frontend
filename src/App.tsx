import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import RequireAuth from './components/routes/RequireAuth';

import Home from './pages/Home';
import Dashboard from './pages/User/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Container from './components/layout/Container';
import Profile from './pages/User/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Container>  
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* PRIVATE ROUTES */}
            <Route path='/dashboard' element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path='/profile' element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  )
}

export default App
