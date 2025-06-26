import NavBar from "../../features/NavBar";
import HeroSection from "./components/HeroSection.jsx";
import ProblemHighlight from "./components/ProblemHighlight.jsx";
import CoreFeatures from "./components/CoreFeatures.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import CallToAction from "./components/CallToAction.jsx";

/**
 * HomePage Component
 */
function HomePage() {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Hero Section of the page */}
      <HeroSection />

      {/* Section highlighting the problem CropChain solves */}
      <ProblemHighlight />

      {/* Section detailing the core features of CropChain */}
      <CoreFeatures />

      {/* Section explaining how CropChain works */}
      <HowItWorks />

      {/* Final call-to-action section */}
      <CallToAction />
    </>
  );
}

export default HomePage;
