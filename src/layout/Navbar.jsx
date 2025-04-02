import { Outlet, Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";

const MenuLinks = ({ isMobile = false, toggleMenu }) => {

  return (
    <ul
      className={`flex ${isMobile ? "flex-col space-y-2" : "flex-row space-x-6"}`}
    >
      <li>
        <Link
          onClick={toggleMenu}
          to="/"
          className="block px-4 py-2 rounded-md text-gray-900 hover:bg-gray-200 transition duration-300"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          onClick={toggleMenu}
          to="/flow"
          className="block px-4 py-2 rounded-md text-gray-900 hover:bg-gray-200 transition duration-300"
        >
          Flow
        </Link>
      </li>
      <li>
        <Link
          onClick={toggleMenu}
          to="/tester"
          className="block px-4 py-2 rounded-md text-gray-900 hover:bg-gray-200 transition duration-300"
        >
          Data
        </Link>
      </li>
    </ul>
  );
};

const NavBarContainer = ({ children }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {children}
        </div>
      </div>
    </nav>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <button
      onClick={toggle}
      className="md:hidden p-2 text-gray-900 focus:outline-none"
      aria-label="Toggle Menu"
    >
      {isOpen ? (
        // Close icon
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
};

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeMenu = () => isOpen && setIsOpen(false);

  return (
    <div>
      <NavBarContainer {...props}>
        {/* Logo / Title */}
    <div className="flex-shrink-0">
      <Link to="/" className="text-gray-900 font-serif font-bold text-xl">
        Sesame
      </Link>
    </div>
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <MenuLinks />
        </div>
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <MenuToggle toggle={toggle} isOpen={isOpen} />
        </div>
      </NavBarContainer>
      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-gray-100">
          <MenuLinks isMobile={true} toggleMenu={closeMenu} />
        </div>
      )}
      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};

export default NavBar;
