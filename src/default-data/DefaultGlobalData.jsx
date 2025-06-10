// src/context/FarmersContext.jsx
import { createContext, useContext, useState } from 'react';
import farmersData from './default-farmers.json';
import buyersData from './default-buyers.json';
import defaultData from './global-parameters.json';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [farmers, setFarmers] = useState(farmersData);
  const [buyers, setBuyers] = useState(buyersData);
  const [global, setGlobal] = useState(defaultData);

  return (
    <GlobalContext.Provider value={{ farmers, setFarmers, buyers, setBuyers, global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);
