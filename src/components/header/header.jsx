import UserTag from "../userData/userdata.jsx";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import BookingOverlay from "../bookingOverlay.jsx";

// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = {
    left: [
      {
        label: "Accommodation",
        items: ["Deluxe", "Standard", "Suites"],
      },
      {
        label: "Dining",
      },
      {
        label: "Experiences",
      },
    ],
    right: [
      { label: "Weddings & Events" },
      { label: "Gallery" },
      { label: "Contact" },
    ],
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden z-50"
            >
              {isMobileMenuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                />
              )}
            </button>

            {/* Left Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.left.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`font-['Playfair_Display'] uppercase tracking-wide text-sm transition-colors duration-300 flex items-center gap-1 ${
                      isScrolled
                        ? "text-gray-800 hover:text-[#C5A059]"
                        : "text-white hover:text-[#C5A059]"
                    }`}
                  >
                    {item.label}
                    {item.items && <ChevronDown className="w-4 h-4" />}
                  </button>
                  {item.items && openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                      {item.items.map((subItem, subIdx) => (
                        <a
                          key={subIdx}
                          href="#"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#C5A059] hover:text-white transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Logo - Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <a href="#" className="flex flex-col items-center">
                <h1
                  className={`font-['Playfair_Display'] text-2xl lg:text-3xl font-bold tracking-wider transition-colors duration-300 ${
                    isScrolled ? "text-[#C5A059]" : "text-white"
                  }`}
                >
                  AURELIA
                </h1>
                <span
                  className={`font-['Playfair_Display'] text-xs lg:text-sm tracking-[0.3em] transition-colors duration-300 ${
                    isScrolled ? "text-gray-600" : "text-white/90"
                  }`}
                >
                  GRAND
                </span>
              </a>
            </div>

            {/* Right Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.right.map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`font-['Playfair_Display'] uppercase tracking-wide text-sm transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-800 hover:text-[#C5A059]"
                      : "text-white hover:text-[#C5A059]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => setIsBookingOpen(true)} // <-- Update this
                className={`px-6 py-2 border-2 transition-all duration-300 font-['Playfair_Display'] uppercase tracking-wide text-sm ${
                  isScrolled
                    ? "border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-gray-800"
                }`}
              >
                Book Now
              </button>
            </nav>

            {/* Mobile Book Now Button */}
            <button
              onClick={() => setIsBookingOpen(true)} // <-- Update this
              className="lg:hidden px-4 py-2 border-2 border-[#C5A059] text-[#C5A059] text-sm font-['Playfair_Display'] uppercase"
            >
              Book
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
            <nav className="px-6 py-8 space-y-6">
              {[...navItems.left, ...navItems.right].map((item, idx) => (
                <div key={idx}>
                  <a
                    href="#"
                    className="block text-lg font-['Playfair_Display'] text-gray-800 uppercase tracking-wide py-2"
                  >
                    {item.label}
                  </a>
                  {item.items && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.items.map((subItem, subIdx) => (
                        <a
                          key={subIdx}
                          href="#"
                          className="block text-sm text-gray-600 py-1"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
      <BookingOverlay
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}

export default Header;
