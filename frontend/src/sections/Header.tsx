import { Link } from "react-router-dom";
import { LuMapPin, LuPhone, LuMail } from "react-icons/lu";
import "@/styles/mystyles.css";
import useAuth from "@/hooks/useAuth";
import { useModal } from "@/contexts/modalContext";

const Header = () => {
  const { user } = useAuth();

  const isLoggedIn = user?.isAuthenticated;

  const userRole = user?.data?.role;

  const { openLoginModal } = useModal();

  const renderNavLink = () => {
    if (!isLoggedIn) {
      return (
        <a
          className="h-11 booking-btn border-2 border-white hover:bg-[#AF8447] hover:text-accent-foreground"
          onClick={(e) => {
            e.preventDefault();
            openLoginModal();
          }}
        >
          SIGN IN
        </a>
      );
    }

    if (userRole === "barber") {
      return (
        <a
          href="/dashboard"
          className="h-11 booking-btn border-2 border-white hover:bg-[#AF8447] hover:text-accent-foreground"
        >
          DASHBOARD
        </a>
      );
    }

    if (userRole === "customer") {
      return (
        <a
          href="/booking"
          className="h-11 booking-btn border-2 border-white hover:bg-[#AF8447] hover:text-accent-foreground"
        >
          BOOKINGS
        </a>
      );
    }
  };

  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    duration: number
  ) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href")?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        smoothScrollTo(targetElement, duration);
      }
    }
  };

  const smoothScrollTo = (element: HTMLElement, duration: number) => {
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * progressPercentage);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };
  return (
    <>
      <div className="bg-transparent">
        <header className="text-white font-chakra bg-transparent">
          <div
            className="mx-auto px-4 py-4 flex items-center
             border-b-2 border-white border-opacity-25"
          >
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
              <span>
                <img
                  src="/logo.svg"
                  alt="barberbook logo"
                  className="h-10 w-10"
                />
              </span>{" "}
              BARBERBOOK
            </Link>
            <div className="flex items-center space-x-4">
              <a
                href="#about"
                className="text-white hover:text-gray-300"
                onClick={(e) => handleSmoothScroll(e, 1000)}
              >
                ABOUT
              </a>
              <Link to="/barbers" className="text-white hover:text-gray-300">
                BARBERS
              </Link>
              {renderNavLink()}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
