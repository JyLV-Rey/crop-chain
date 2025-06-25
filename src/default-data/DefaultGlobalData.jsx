import { createContext, useContext, useState, useEffect } from 'react';
import farmersRegions from './default-farmers.json';
import buyersRegions from './default-buyers.json';
import globalRegions from './global-parameters.json';
import distanceData from './default-distance.json';

const GlobalContext = createContext();

const LOCAL_KEYS = {
  farmers: 'app_farmers',
  buyers: 'app_buyers',
  global: 'app_global',
  distance: 'app_distance',
  region: 'app_region_index'
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
  // Load or default to region 0
  const [regionIndex, setRegionIndex] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.region, 1)
  );

  // Load specific region's farmers/buyers/global data
  const [farmers, setFarmers] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.farmers, farmersRegions[regionIndex]?.farmers || [])
  );

  const [buyers, setBuyers] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.buyers, buyersRegions[regionIndex]?.buyers || [])
  );

  const [global, setGlobal] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.global, globalRegions[regionIndex] || {})
  );

  const [distance, setDistance] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.distance, distanceData)
  );

  // Sync data to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.region, JSON.stringify(regionIndex));
  }, [regionIndex]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.farmers, JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.buyers, JSON.stringify(buyers));
  }, [buyers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.global, JSON.stringify(global));
  }, [global]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.distance, JSON.stringify(distance));
  }, [distance]);

  // Function to switch regions (and override all localStorage)
  const loadRegion = (index) => {
    setRegionIndex(index);
    const newFarmers = farmersRegions[index]?.farmers || [];
    const newBuyers = buyersRegions[index]?.buyers || [];
    const newGlobal = globalRegions[index] || {};

    setFarmers(newFarmers);
    setBuyers(newBuyers);
    setGlobal(newGlobal);
    localStorage.setItem(LOCAL_KEYS.farmers, JSON.stringify(newFarmers));
    localStorage.setItem(LOCAL_KEYS.buyers, JSON.stringify(newBuyers));
    localStorage.setItem(LOCAL_KEYS.global, JSON.stringify(newGlobal));
    localStorage.setItem(LOCAL_KEYS.region, JSON.stringify(index));
  };

  console.log("Farmers :",farmers);
  console.log("Buyers: ",buyers);
  console.log("Global: ",global);
  console.log("Region: ",regionIndex);

  return (
    <GlobalContext.Provider
      value={{
        regionIndex,
        setRegionIndex,
        farmers,
        setFarmers,
        buyers,
        setBuyers,
        global,
        setGlobal,
        distance,
        setDistance,
        loadRegion
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);
