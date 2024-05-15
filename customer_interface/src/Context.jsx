import React, { createContext, useState, useContext, useEffect } from 'react';

const Context = createContext();

export const useAuth = () => useContext(Context);

export const ContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuthState = localStorage.getItem('isAuthenticated');
        return storedAuthState ? JSON.parse(storedAuthState) : false;
    });

      // Save isAuthenticated state to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      }, [isAuthenticated]);

    const [searchCount, setSearchCount] = useState(0); //State to keep track of how many time the user click the search button. Used to invoke Home page reload

    const [totalItems, setTotalItems] = useState()
    const [user, setUser] = useState({});
    const [paymentCards, setPaymentCards] = useState([])
    const [location, setLocation] = useState({})
    const login = (auth, userData) => {
        console.log(auth)
        setIsAuthenticated(auth);
        setUser(userData);
    };

    //   const updateSub = (member) => {
    //     setUser(...);
    //   };

    return (
        <Context.Provider value={{ isAuthenticated, user, setUser,
                                 login, setIsAuthenticated, 
                                 totalItems, setTotalItems,
                                 paymentCards, setPaymentCards, searchCount, setSearchCount ,
                                 location, setLocation}}>

            {children}
        </Context.Provider>
    );
};
