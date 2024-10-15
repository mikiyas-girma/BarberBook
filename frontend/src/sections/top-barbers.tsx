import { CardDemo } from "@/components/blocks/cards-demo-3";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function TopBarbers() {
  return (
    <>
      <div className="bg-[#1f1f1f] py-10">
        <div className="font-merriweather">
          <div className="text-center text-4xl pt-6 pb-2">
            Meet Our Proffesional Barbers
          </div>
          <div className="text-center text-sm leading-7">
            <p>
              Our barbers are highly skilled and experienced in their craft.
            </p>
            <p>
              They are dedicated to providing you with the best service
              possible.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-x-8 max-w-screen-xl mx-auto my-6">
          <div>
            <CardDemo />
          </div>
          <div>
            <CardDemo />
          </div>
          <div>
            <CardDemo />
          </div>
          <div>
            <CardDemo />
          </div>
        </div>
        <div className="flex justify-center gap-x-6">
          <div className="flex justify-center">
            <GrPrevious color="#FFBF00" size={24}/>
          </div>
          <div className="flex justify-center">
            <GrNext color="#FFBF00" size={24}/>
          </div>
        </div>
        <div className="booking-btn h-11 ml-14 rounded mt-4 bg-amber-600 hover:bg-amber-500 text-black text-xl">
                View All Our Barbers
        </div>
      </div>
    </>
  );
}
