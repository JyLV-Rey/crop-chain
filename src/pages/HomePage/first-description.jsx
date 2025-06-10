import LearnMore from "../../features/LearnMore";


function IntroDescription() {
  return (
    <div className="flex flex-row items-center justify-center p-6 bg-neutral-800 text-white rounded-lg">
      <div>
        <h1 className="text-4xl font-extrabold">Assigns The Farmers</h1>
        <p>
          Farmers would needd
        </p>
        <LearnMore/>
      </div>
      <div className="ml-10">
        <img src="src\assets\main-page\00018379-scaled.webp" alt="Intro Image" className="w-64 h-64 rounded-lg shadow-lg" />
      </div>
    </div>
  );
}

export default IntroDescription;