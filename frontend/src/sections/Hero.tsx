import { useState, useEffect } from "react";
import Header from "./Header";
import LoginModal from "@/sections/LoginModal";
import { useModal } from "@/contexts/modalContext";

const images = [
  //   "/images/barbershop1.jpg?height=1080&width=1920",
  //   "/images/2.jpg?height=1080&width=1920",
  "/images/3.jpg?height=1080&width=1920",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const { isLoginOpen, openLoginModal, closeLoginModal } = useModal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen flex flex-col relative">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 mix-blend-difference transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="inset-0 bg-black bg-opacity-0" />
      <div className="z-10 flex flex-col min-h-screen">
        <Header />
        <main className="font-chakra flex-grow flex items-center ml-12">
          <div className="text text-white">
            <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
            <h1 className="text-6xl font-bold mb-4 text-[#F3C623] font-space_grotesk">
              Experience the <span className="text-[#F3C623]">traditional</span>
              <br />
              barbershop feel
            </h1>
            <p className="text-2xl mb-8 font-space_grotesk">
              Professional care to maintain your perfect look
            </p>
            <div className="space-x-4 font-space_grotesk py-10">
              <button
                className="booking-btn h-12 text-white bg-[#AF8447]"
                onClick={() => {
                  openLoginModal();
                }}
              >
                Be Our Customer
              </button>
              <div className="booking-btn h-12 text-[#493628] bg-white hover:text-gray-800">
                BOOK NOW
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
