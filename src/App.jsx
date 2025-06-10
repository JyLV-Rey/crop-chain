import{ Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import ViewData from './pages/ViewData/ViewData.jsx';

function App() {
  return (
    <>
        <div className="flex flex-col bg-neutral-100 min-h-screen w-screen">
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ViewData" element={<ViewData />}></Route>
          </Routes>
        </div>
    </>
  );
}

export default App;
