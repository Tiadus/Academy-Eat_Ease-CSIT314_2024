import "./App.css";
import SignIn from "./Components/SigninSignup/Signin";
import SignUp from "./Components/SigninSignup/Signup";
import { ContextProvider } from "./Context";
import Dashboard from "./Pages/Dashboard";
import SigninSignup from "./Pages/SigninSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import Snackbar from '@mui/material/Snackbar';

function App() {
  const [webSocket, setWS] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [incomingCount, setIncomingCount] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const reload = () => {
    handleClick();
    setIncomingCount(prevCount => prevCount + 1);
  }

  const connectWebSocket = (restaurantCode) => {
    const ws = new WebSocket("ws://localhost:4000");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      ws.send(restaurantCode);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = event.data;
      //console.log(message);
      reload();
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
      setWS(null); // Reset the instance
    };

    setWS(ws);
  };

  return (
    <ContextProvider>
      <BrowserRouter>
      <SnackbarProvider maxSnack={5}>
        <Routes>
          <Route path="/" element={<SignIn webSocket={webSocket} connectWebSocket={connectWebSocket}/>}></Route>
          <Route path="/Dashboard" element={<Dashboard incomingCount={incomingCount}/>}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
          {/* <Route path="/profile" element={<Profile />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/page" element={<LandingPage />}></Route> */}
        </Routes>
        <Snackbar
          open={open}
          autoHideDuration={10000}
          onClose={handleClose}
          message="New order is coming "
        />
      </SnackbarProvider>
        {/* <Footer /> */}
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
