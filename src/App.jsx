import{ Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import ViewData from './pages/ViewData/ViewData.jsx';
import Overview from "./pages/Overview/Overview.jsx";
import AssignmentInitialization from './pages/Assignment/Assignment1/AssingmentInitlialization.jsx';
import EditFarmer from './pages/Assignment/Assignment1/EditPage/EditFarmer.jsx';
import EditBuyer from './pages/Assignment/Assignment1/EditPage/EditBuyer.jsx';
import GlobalConfig from './pages/Assignment/GlobalConfig/GlobalConfig.jsx';

function App() {
  return (
    <>
        <div className="flex flex-col bg-neutral-100 min-h-screen w-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Overview" element={<Overview />}></Route>
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ViewData" element={<ViewData />}></Route>
            <Route path="/Assignment/Initialization" element={<AssignmentInitialization />}></Route>
            <Route path="/Assignment/Initialization/EditGlobal" element={<GlobalConfig />}></Route>
            <Route path="/Assignment/Initialization/EditFarmer" element={<EditFarmer />}></Route>
            <Route path="/Assignment/Initialization/EditBuyer" element={<EditBuyer />}></Route>
          </Routes>
        </div>
    </>
  );
}

export default App;
