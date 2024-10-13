import { useState, useEffect } from "react";
import Header from "./Header";
import { Button } from "@/components/ui/button";

const images = [
  "/images/barbershop1.jpg?height=1080&width=1920",
  "/images/2.jpg?height=1080&width=1920",
  "/images/3.jpg?height=1080&width=1920",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

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
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Experience the traditional<br />barbershop feel</h1>
            <p className="text-xl mb-8">Professional care to maintain your perfect look</p>
            <div className="space-x-4">
              <Button variant="default" size="lg" className="bg-white text-black hover:bg-gray-200">
                SEE MORE
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
                BOOK NOW
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
