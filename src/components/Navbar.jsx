import React,{useState} from "react";


function Navbar() {

    const [showMenu, setShowMenu] = useState(true);

    const handleMenu = () => {
        setShowMenu(!showMenu);
    };


  return (
    <div className="sticky top-0 z-10 text-white flex justify-between items-center w-full max-w-none mx-auto px-4 bg-[#080808]  font-[Poppins] text-[15px] font-[500]">
        <a href="/"><img src = "namelogo.avif" alt = "logo picture" className="logoImage h-20 hover:cursor-pointer rounded-full" /></a>
        <ul className="nav hidden lg:flex flex-1 justify-center space-x-4 flex-wrap"> 
            <a href = "#About"><li className="navAboutMe p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">About Me</li></a>
            <a href = "#Experience"><li className="navExperience p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Experience</li></a>
            <a href = "#Projects"><li className="navProjects p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Projects</li></a>
            <a href = "#Education"><li className="navEducation p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Education</li></a>
            <a href = "#Certifications"><li className="navCertifications p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Certifications</li></a>
            <a href = "#Contact"><li className="navContact p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Contact</li></a>
        </ul>
        <a href="https://drive.google.com/file/d/1YAPP8R59e5zHDXWGUG4RyST61aZZZh8a/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="navResume hidden lg:block p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Resume</a>
        <div className="block lg:hidden">
            {showMenu ? <GiHamburgerMenu size={20} onClick={handleMenu} className="cursor-pointer"/> : <IoCloseSharp size={20} onClick={handleMenu} className="cursor-pointer"/>}
        </div>
        <div className={`fixed left-0 top-0 w-[60%] border-r h-full border-r-gray-900 bg-[#080808] ease-in-out duration-500 ${
          !showMenu ? "translate-x-0" : "-translate-x-full"
        }`}>
            <a href="/"><img src = "namelogo.avif" alt = "logo picture" className="logoImage h-20 hover:cursor-pointer rounded-full" /></a>
            <ul className="uppercase p-4 " onClick={handleMenu}>
                <a href = "#About"><li className="p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">About Me</li></a>
                <a href = "#Experience"><li className="p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Experience</li></a>
                <a href = "#Projects"><li className="p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Projects</li></a>
                <a href = "#Education"><li className="p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Education</li></a>
                <a href = "#Certifications"><li className="p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Certifications</li></a>
                <a href = "#Contact"><li className="p-4 hover:bg-gray-700 hover:rounded-xl hover:cursor-pointer">Contact</li></a>
            </ul>
        </div>
    </div>
  );
}

export default Navbar;