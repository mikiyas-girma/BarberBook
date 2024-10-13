import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { LuMapPin, LuPhone, LuMail, LuFacebook, LuTwitter, LuYoutube, LuLinkedin, LuInstagram } from 'react-icons/lu'

const images = [
  '/images/barbershop1.jpg?height=1080&width=1920',
  '/images/2.jpg?height=1080&width=1920',
  '/images/3.jpg?height=1080&width=1920',
]

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white">
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
            <Link to='/twitter'>
            </Link>
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
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            BARBERBOOK
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="#" className="text-gray-600 hover:text-gray-800">HOME</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-800">ABOUT US</Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-800">SERVICES</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-800">CONTACT</Link>
            <Button variant="outline" size="sm">
              BOOKING
            </Button>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <div className="relative h-screen">
          {images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Experience the traditional<br />barbershop feel</h1>
              <p className="text-xl mb-8">Professional care to maintain your perfect look</p>
              <div className="space-x-4">
                <Button variant="default" size="lg">
                  READ MORE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
