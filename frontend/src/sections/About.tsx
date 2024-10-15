import { Button } from "@/components/ui/button";


export default function About() {
  return (
    <>
    <div className="bg-[#1f1f1f] font-merriweather my-10">
      <div className="max-w-screen-lg m-auto flex items-center gap-10 py-10">
        <div>
          <div className="text-4xl my-8 font-chakra">About Us</div>
          <div className="flex flex-col items-center gap-y-8 w-[60%]">
            <p>
              Welcome to Barberbook, the traditional barbershop experience. We
              offer a range of services to help you look your best.
            </p>
            <p>
              We established Barberbook in 2024 to provide a traditional
              barbershop experience. 
            </p>
            <p>
              Now you can book an appointment with us online. This will help you
              save time and avoid waiting in line.
            </p>
          </div>
          <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-black">
                Book With Your Best Barber Now
          </Button>
        </div>
        <div>
          <div className="w-96 h-96 rounded-lg overflow-hidden mt-4">
            <img
              src="/images/image3.jpg?height=256&width=256"
              alt="Colorful portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
