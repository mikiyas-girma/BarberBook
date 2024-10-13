import { Link } from "react-router-dom";
import {
  LuMapPin,
  LuPhone,
  LuMail,
} from "react-icons/lu";
import '@/styles/mystyles.css'

const Header = () => {
  return (
    <>
      <header className="bg-transparent text-white font-chakra">
        <div className="mx-auto px-4 py-4 flex items-center
             border-b-2 border-white border-opacity-25">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <LuMapPin className="h-4 w-4 mr-2" />
              <span className="">4 Kilo Street, Addis Ababa</span>
            </div>
            <div className="flex items-center">
              <LuPhone className="h-4 w-4 mr-2" />
              <span className="">(251) 923-421-123</span>
            </div>
            <div className="flex items-center">
              <LuMail className="h-4 w-4 mr-2" />
              <span className="">contact@barberbook.com</span>
            </div>
          </div>
        </div>
      </header>
      <nav className="bg-transparent text-white font-merriweather">
        <div className="px-4 py-4 mx-12 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            BARBERBOOK
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="#" className="text-white hover:text-gray-300">
              HOME
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              ABOUT US
            </Link>
            <Link to="/services" className="text-white hover:text-gray-300">
              SERVICES
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              CONTACT
            </Link>
            <div className="booking-btn">
              BOOKING
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
