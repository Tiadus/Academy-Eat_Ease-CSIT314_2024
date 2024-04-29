import React, { createContext, useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
const Context = createContext();

export const useAuthOwner = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });

  // Save isAuthenticated state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const [totalItems, setTotalItems] = useState();
  const [user, setUser] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [revenue, setRevenue] = useState("")
  const login = (auth, userData) => {
    console.log(auth);
    setIsAuthenticated(auth);
    setUser(userData);
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
        revenue, setRevenue
      }}
    >
      {children}
    </Context.Provider>
  );
};
