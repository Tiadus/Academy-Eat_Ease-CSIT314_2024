import "./App.css";
import SignIn from "./Components/SigninSignup/Signin";
import SignUp from "./Components/SigninSignup/Signup";
import { ContextProvider } from "./Context";
import Dashboard from "./Pages/Dashboard";
import SigninSignup from "./Pages/SigninSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
          {/* <Route path="/profile" element={<Profile />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/page" element={<LandingPage />}></Route> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
