import { createContext, useContext, useState, useEffect } from 'react';
import farmersData from './default-farmers.json';
import buyersData from './default-buyers.json';
import defaultData from './global-parameters.json';

const GlobalContext = createContext();

const LOCAL_KEYS = {
  farmers: 'app_farmers',
  buyers: 'app_buyers',
  global: 'app_global',
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error(`Failed to load ${key} from localStorage`, err);
    return defaultValue;
  }
};

export const GlobalProvider = ({ children }) => {
  const [farmers, setFarmers] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.farmers, farmersData)
  );

  const [buyers, setBuyers] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.buyers, buyersData)
  );

  const [global, setGlobal] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.global, defaultData)
  );

  // Sync to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.farmers, JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.buyers, JSON.stringify(buyers));
  }, [buyers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.global, JSON.stringify(global));
  }, [global]);

  return (
    <GlobalContext.Provider value={{ farmers, setFarmers, buyers, setBuyers, global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);
