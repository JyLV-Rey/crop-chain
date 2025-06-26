import { BarChart3 } from "lucide-react";


function SampleOutputPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-8 h-8 text-sky-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Sample Output Preview</h2>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg">
        <img
          src="/sample_output.png" 
          alt="Sample Output"
          className="max-w-full h-auto block mx-auto rounded-md shadow-sm"
        />
      </div>
    </div>
  );
}

export default SampleOutputPreview;