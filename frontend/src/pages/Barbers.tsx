import { CardDemo } from "@/components/blocks/cards-demo-3";
import Header from "@/sections/Header";
import { Input } from "@/components/ui/input";
import { LuSearch } from 'react-icons/lu';

export default function Barbers() {
  return (
    <div className="font-space_grotesk bg-[#1f1f1f] min-h-screen">
     <div style={{ background: 'conic-gradient(from 120deg, #f59e0b, transparent)' }} className="mb-8">
        <Header />
      </div>
      <div className="flex justify-center gap-x-16 mb-8">
        <div className="relative w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LuSearch className="text-gray-50" />
          </span>
          <Input type="search" className="pl-10 w-full bg-transparent" placeholder="search by place" />
        </div>
        {/* <div>
          <Input type="filter" className="w-72" placeholder="filter" />
        </div> */}
      </div>
      <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto py-4">
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
    </div>
  );
}
