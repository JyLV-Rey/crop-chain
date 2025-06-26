/**
 * ProblemHighlight Component
 */
function ProblemHighlight() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-red-800 mb-4">The Problem We're Solving</h2>
          <p className="text-xl text-red-700 leading-relaxed">
            Small farmers struggle to find buyers, and buyers face unpredictable supply. CropChain solves this
            mismatch with smart matching and logistics awareness.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProblemHighlight;
