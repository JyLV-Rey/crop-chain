import NavBar from "../../features/NavBar";
import OverviewHeader from './components/OverviewHeader.jsx';
import ProblemStatement from './components/ProblemStatement.jsx';
import ProjectDescription from './components/ProjectDescription.jsx';
import ProjectObjectives from './components/ProjectObjectives.jsx';
import SystemArchitecture from './components/SystemArchitecture.jsx';
import IntendedUsers from './components/IntendedUsers.jsx';
import HowToUseWebsite from './components/HowToUseWebsite.jsx';
import MathematicalAnalysis from './components/MathematicalAnalysis.jsx';
import SampleOutputPreview from './components/SampleOutputPreview.jsx';
import FutureConsiderations from './components/FutureConsiderations.jsx';

/**
 * Self explanatory names
 */

function Overview() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          <OverviewHeader />

          <ProblemStatement />

          <ProjectDescription />

          <ProjectObjectives />

          <SystemArchitecture />

          <IntendedUsers />

          <HowToUseWebsite />

          <MathematicalAnalysis />

          <SampleOutputPreview />

          <FutureConsiderations />
        </div>
      </div>
    </>
  );
}

export default Overview;
