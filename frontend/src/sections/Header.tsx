import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuFacebook,
  LuTwitter,
  LuYoutube,
  LuLinkedin,
  LuInstagram,
} from "react-icons/lu";

const Header = () => {
  return (
    <>
      <header className="bg-transparent text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <LuMapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">4 Kilo Street, Addis Ababa</span>
            </div>
            <div className="flex items-center">
              <LuPhone className="h-4 w-4 mr-2" />
              <span className="text-sm">(251) 923-421-123</span>
            </div>
            <div className="flex items-center">
              <LuMail className="h-4 w-4 mr-2" />
              <span className="text-sm">contact@barberbook.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="#" className="text-white hover:text-gray-300">
              <LuFacebook className="h-4 w-4" />
            </Link>
            <Link to="/twitter"></Link>
            <LuTwitter className="h-4 w-4" />
            <Link to="#" className="text-white hover:text-gray-300">
              <LuYoutube className="h-4 w-4" />
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              <LuLinkedin className="h-4 w-4" />
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              <LuInstagram className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
      <nav className="bg-transparent text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold ">
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
            <Button variant="outline" size="sm">
              BOOKING
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
