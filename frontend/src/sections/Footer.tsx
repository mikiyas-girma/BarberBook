import { LuFacebook, LuTwitter, LuInstagram } from 'react-icons/lu'
import { Link } from 'react-router-dom';
import { useEffect } from "react";


export default function Footer() {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, []);
  return (
    <footer id='footer' className="bg-black text-white font-merriweather py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full mr-3"></div>
              <span className="text-xl font-bold">BarberBook</span>
            </div>
            <p className="text-sm mb-2">We are here to make you look better </p>
            <p className="text-sm text-gray-400">Addis Ababa, 2024</p>
          </div>
          <div className='col-start-4'>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['Why', 'Barbers', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; 2024 BarberBook Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              <LuFacebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              <LuTwitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              <LuInstagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
