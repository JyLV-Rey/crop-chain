import { Link, useLocation } from "react-router-dom"

function NavBar() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === "/Assignment/Initialization") {
      return location.pathname.startsWith("/Assignment")
    }
    return location.pathname === path
  }

  const getNavLinkClass = (path) => {
    const baseClass =
      "relative px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform"

    if (isActive(path)) {
      return `${baseClass} bg-green-100 text-green-700 shadow-sm scale-105`
    }

    return `${baseClass} text-gray-600 hover:text-green-600 hover:bg-green-50 hover:scale-110 hover:font-bold`
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
            <img src="/logos/CropChain.png" className="w-10 h-10" alt="CropChain Logo" />
            <span className="text-2xl font-bold text-gray-800">CropChain</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2">
            <Link to="/" className={getNavLinkClass("/")}>
              Home
            </Link>
            <Link to="/Overview" className={getNavLinkClass("/Overview")}>
              Overview
            </Link>
            <Link to="/ViewData" className={getNavLinkClass("/ViewData")}>
              View Data
            </Link>
            <Link to="/Assignment/Initialization" className={getNavLinkClass("/Assignment/Initialization")}>
              Assignment
            </Link>
            <Link to="/AboutUs" className={getNavLinkClass("/AboutUs")}>
              About Us
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NavBar
