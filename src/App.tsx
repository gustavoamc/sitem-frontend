import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import RequireAuth from './components/routes/RequireAuth';
import NotFound from './components/routes/NotFound';

import Home from './pages/Home';
import Dashboard from './pages/User/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Container from './components/layout/Container';
import Profile from './pages/User/Profile';
import AdminArea from './pages/Admin/AdminArea';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Container>  
          <Routes>
            {/* PUBLIC ROUTES */}
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
            <Route path='/admin' element={
              <RequireAuth routeRole='admin'>
                < AdminArea />
              </RequireAuth>
            } />
            {/* 404 */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  )
}

export default App
