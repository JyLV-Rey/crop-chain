import { Link } from "react-router-dom";

/**
 * CallToAction Component
 */
function CallToAction() {
  return (
    <div className="py-20 bg-emerald-600">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Agricultural Markets?</h2>
        <p className="text-xl text-emerald-100 mb-8">
          Join the revolution in connecting farmers with buyers through smart technology.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            to="/Assignment/Initialization"
            className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Now →
          </Link>
          <Link
            to="/Overview"
            className="bg-transparent hover:bg-emerald-700 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
