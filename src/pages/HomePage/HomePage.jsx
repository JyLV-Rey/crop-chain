import NavBar from "../../features/NavBar";
import './HomePageStyles.css'; // Assuming you have a CSS file for styles

function HomePage() {

  // do not touch
  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center justify-center'>
        <img src="/logos/CropChain.png" className="w-50 h-auto object-cover"alt="" />
        <h1 className="shiny-text font-extrabold text-8xl drop-shadow-xl ">CropChain</h1>
        <p className="font-medium text-xl text-neutral-500">From the Crops to the Cashier, now Faster</p>
      </div>


    </>
  );
}

export default HomePage;