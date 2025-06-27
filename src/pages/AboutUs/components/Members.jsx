
function Members() {

  const Members = [
    {name:"Jyeshua Velasco", picture:"about-us/group_members/velasco.png", url: "https://www.facebook.com/jyeshuareylao.velasco/"},
    {name:"Jen Nataba", picture:"about-us/group_members/nataba.png", url: "https://www.facebook.com/oxyjen311"},
    {name:"Frances Montemayor", picture:"about-us/group_members/montemayor.png", url: "https://www.facebook.com/raineysznxoxo"},
    {name: "Matan Exconde", picture:"about-us/group_members/exconde.png", url: "https://www.facebook.com/matan.exconde"},
    {name:"Jorelle Lenar", picture:"about-us/group_members/lenar.png", url:"https://www.facebook.com/jorellecybee.lenar"},
    {name:"Shikina Cabral", picture:"about-us/group_members/cabral.png", url:"https://www.facebook.com/shikinacabral"},
    {name:"Princess Padauan", picture:"about-us/group_members/padauan.png", url:"https://www.facebook.com/intetcutiepieee"},
    {name:"Luis Dela Cruz", picture:"about-us/group_members/dela_cruz.png", url:"https://www.facebook.com/luismigueldlcrz"},
    {name:"Eric Samillano", picture:"about-us/group_members/samilliano.png", url: "https://www.facebook.com/luismigueldlcrz"}
  ]
  return (
    <>

      <div className=" m-5 mt-10 p-4 flex flex-col w-auto align-middle justify-center text-center ">
        <h1 className="text-6xl font-extrabold text-neutral-600 text-shadow-lg/10">
          Meet the Members
        </h1>
        <h2 className="text-xl font-medium text-neutral-400 text-shadow-lg/4">These are the people that made the website possible.</h2>
      </div>

      <div className='flex flex-row items-center justify-around flex-wrap w-auto bg-neutral-100 shadow-xl/5'>
        {Members.map((member, index) => (
          <a href={member.url} target="_blank" rel="noopener noreferrer" key={index}>
            <div className="flex flex-col bg-transparent hover:shadow-2xl shadow-lg hover:text-neutral-800 rounded-lg h-auto w-80 m-2 p-1 hover:bg-neutral-300 hover:scale-105 duration-300 ease-(--my-beizer) text-neutral-500">
              <img src={member.picture} alt={`${member.name}'s Picture`} className="object-cover h-auto w-full rounded-lg" />
              <div key={index} className="p-4">
                <h2 className="text-2xl font-extrabold text-center justify-center align-middle">{member.name}</h2>
              </div>
            </div>
          </a>
        ))}
      </div>

    </>
  );
}

export default Members;