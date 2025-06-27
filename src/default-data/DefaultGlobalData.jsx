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
  // Load or default to region 1
  const [regionIndex, setRegionIndex] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.region, 1)
  );

  // Keys specific to region
  const regionFarmersKey = `${LOCAL_KEYS.farmers}_region${regionIndex}`;
  const regionBuyersKey = `${LOCAL_KEYS.buyers}_region${regionIndex}`;
  const regionGlobalKey = `${LOCAL_KEYS.global}_region${regionIndex}`;

  const [farmers, setFarmers] = useState(() =>
    loadFromLocalStorage(regionFarmersKey, farmersRegions[regionIndex]?.farmers || [])
  );

  const [buyers, setBuyers] = useState(() =>
    loadFromLocalStorage(regionBuyersKey, buyersRegions[regionIndex]?.buyers || [])
  );

  const [global, setGlobal] = useState(() =>
    loadFromLocalStorage(regionGlobalKey, globalRegions[regionIndex] || {})
  );

  const [distance, setDistance] = useState(() =>
    loadFromLocalStorage(LOCAL_KEYS.distance, distanceData)
  );

  // Save current region index
  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.region, JSON.stringify(regionIndex));
  }, [regionIndex]);

  // Save farmers per region
  useEffect(() => {
    const key = `${LOCAL_KEYS.farmers}_region${regionIndex}`;
    localStorage.setItem(key, JSON.stringify(farmers));
  }, [farmers, regionIndex]);

  // Save buyers per region
  useEffect(() => {
    const key = `${LOCAL_KEYS.buyers}_region${regionIndex}`;
    localStorage.setItem(key, JSON.stringify(buyers));
  }, [buyers, regionIndex]);

  // Save global parameters per region
  useEffect(() => {
    const key = `${LOCAL_KEYS.global}_region${regionIndex}`;
    localStorage.setItem(key, JSON.stringify(global));
  }, [global, regionIndex]);

  // Save distance (global, not region-specific)
  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.distance, JSON.stringify(distance));
  }, [distance]);

  // Function to load a specific region
  const loadRegion = (index) => {
    setRegionIndex(index);

    const regionFarmersKey = `${LOCAL_KEYS.farmers}_region${index}`;
    const regionBuyersKey = `${LOCAL_KEYS.buyers}_region${index}`;
    const regionGlobalKey = `${LOCAL_KEYS.global}_region${index}`;

    const savedFarmers = loadFromLocalStorage(regionFarmersKey, null);
    const savedBuyers = loadFromLocalStorage(regionBuyersKey, null);
    const savedGlobal = loadFromLocalStorage(regionGlobalKey, null);

    const newFarmers = savedFarmers || farmersRegions[index]?.farmers || [];
    const newBuyers = savedBuyers || buyersRegions[index]?.buyers || [];
    const newGlobal = savedGlobal || globalRegions[index] || {};

    setFarmers(newFarmers);
    setBuyers(newBuyers);
    setGlobal(newGlobal);

    localStorage.setItem(LOCAL_KEYS.region, JSON.stringify(index));
  };

  console.log("Farmers:", farmers);
  console.log("Buyers:", buyers);
  console.log("Global:", global);
  console.log("Region:", regionIndex);

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
