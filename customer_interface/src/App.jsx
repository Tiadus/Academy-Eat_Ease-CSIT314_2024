import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import LogInSignUp from './pages/LogInSignUp.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import { Footer } from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import { ContextProvider } from './Context.jsx';

function App() {

  //Store customer code
  // const [customerCode, setCustomerCode] = useState(0);

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogInSignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/page' element={<LandingPage/>} ></Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
