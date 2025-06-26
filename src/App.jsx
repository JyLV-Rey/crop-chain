import{ Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import ViewData from './pages/ViewData/ViewData.jsx';
import Overview from "./pages/Overview/Overview.jsx";
import AssignmentInitialization from './pages/Assignment/Assignment1/AssingmentInitlialization.jsx';
import EditFarmer from './pages/Assignment/Assignment1/EditPage/EditFarmer.jsx';
import EditBuyer from './pages/Assignment/Assignment1/EditPage/EditBuyer.jsx';
import GlobalConfig from './pages/Assignment/GlobalConfig/GlobalConfig.jsx';
import CreateBuyer from './pages/Assignment/Assignment1/CreatePage/CreateBuyer.jsx';
import CreateFarmer from './pages/Assignment/Assignment1/CreatePage/CreateFarmer.jsx';
import ResultsPage from './pages/ResultPage/ResultsPage.jsx';
import StatsPage from './pages/MetricsPage/StatsPage.jsx';
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
            <Route path="/Assignment/Initialization/CreateBuyer" element={<CreateBuyer />}></Route>
            <Route path="/Assignment/Initialization/CreateFarmer" element={<CreateFarmer />}></Route>
            <Route path="/Assignment/Metric/Result/" element={<ResultsPage />}></Route>
            <Route path="/Assignment/Metric/Statistics/" element={<StatsPage />}></Route>
          </Routes>
        </div>
    </>
  );
}

export default App;
