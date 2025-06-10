function TechStack() {
  const tStack = [
    { name: "HTML", color: "#E34F26", icon: "logos/HTML5.svg", url: "https://html.com/"},
    { name: "CSS", color: "#1572B6", icon: "logos/CSS.svg", url: "https://www.w3.org/Style/CSS/"},
    { name: "JavaScript", color: "#F7DF1E", icon: "logos/JavaScript.svg", url: "https://www.w3schools.com/js/"},
    { name: "React", color: "#61DAFB", icon: "logos/React.svg", url: "https://reactjs.org/"},
    { name: "Vite", color: "#646CFF", icon: "logos/Vite.svg", url: "https://vitejs.dev/"},
    { name: "Tailwind", color: "#06B6D4", icon: "logos/Tailwind.svg", url: "https://tailwindcss.com/"},
    { name: "Leaflet", color: "#2E7D32", icon: "logos/Leaflet.svg", url: "https://leafletjs.com/"},
    { name: "ChartJS", color: "#FF6384", icon: "logos/ChartJS.svg", url: "https://www.chartjs.org/"},
  ];

  return(
    <>
      <img src="logos/CropChain.png" className='h-50 w-fit self-center' alt="" />
      <div className="w-auto p-4 text-center">
        <h2 className="text-6xl text-neutral-600 text-shadow-lg/10 font-extrabold">Tech Stack</h2>
        <h3 className="text-lg text-neutral-400 text-shadow-lg/4 font-medium">These are the programs that made this project possible</h3>
      </div>

      <div className="flex flex-row items-center justify-around bg-neutral-100 shadow-2xl/4 w-auto h-full flex-grow">
        { tStack.map((tech, index) => (
            <a href={tech.url} target="blank">
            <div key={index} className={`ease-(--my-beizer) flex-grow hover:scale-[120%] flex flex-col items-center m-2 p-3 rounded-lg hover:shadow-2xl bg-neutral-100 h-50 w-40 transition`}>
              <img src={tech.icon} alt={`${tech.name} icon`} className={`h-full w-full`}></img>
              <span className="text-2xl font-bold" style={{ color: tech.color }}>{tech.name}</span>
            </div>
            </a>
        ))}
      </div>
    </>
  )
}

export default TechStack;