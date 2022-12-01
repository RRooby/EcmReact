
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'


function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (

    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className='my-3'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetail/>} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
