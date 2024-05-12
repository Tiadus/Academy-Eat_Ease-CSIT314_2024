import React, { createContext, useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
const Context = createContext();

export const useAuthOwner = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  /*const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });

  // Save isAuthenticated state to local storage whenever it changes
  useEffect(() => {
    console.log("gw")
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);*/

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [totalItems, setTotalItems] = useState();
  const [user, setUser] = useState({});
  const [authUser, setAuthUser] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [revenue, setRevenue] = useState("");

  useEffect(() => {
    if (authUser !== null) {
      console.log("hello")
      setIsAuthenticated(authUser.auth);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser !== null) {
      console.log(authUser.userData);
      setUser(authUser.userData);
    }
  }, [isAuthenticated]);
 
  const login = (auth, userData) => {
    console.log(auth);
    console.log('LOGIN USERDATA', userData);
    setAuthUser({
      auth: auth,
      userData: userData
    });
  };

  //   const updateSub = (member) => {
  //     setUser(...);
  //   };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        login,
        setIsAuthenticated,
        totalItems,
        setTotalItems,
        startDate, setStartDate,
        endDate, setEndDate, 
        revenue, setRevenue,
        setAuthUser //setAuthUser to clear data of the user quickly
      }}
    >
      {children}
    </Context.Provider>
  );
};
