import { LayoutGrid } from "@/components/ui/layout-grid";

export default function LatestStyles() {
  return (
    <div className="min-h-screen py-20 w-full bg-[#0f0f0f]">
        <div className="flex justify-center text-5xl font-chakra">
            Latest Styles & Most Popular
        </div>
      <LayoutGrid cards={cards} />
    </div>
  );
}


const cards = [
  {
    id: 1,
    className: "card w-96 h-64 rounded-md",
    thumbnail:
      "/images/image4.jpg",
  },
  {
    id: 2,
    className: "m-auto card w-80 h-64 rounded-md",
    thumbnail:
      "/images/image5.jpg",
  },
  {
    id: 3,
    className: "card w-96 h-64 rounded-md",
    thumbnail:
      "/images/image6.jpg",
  },
  {
    id: 4,
    className: " card w-96 h-64 rounded-md",
    thumbnail:
      "/images/image5.jpg",
  },
  {
    id: 5,
    className: "m-auto w-80 h-64 rounded-md",
    thumbnail:
      "/images/image5.jpg",
  },
  {
    id: 6,
    className: " card w-96 h-64 rounded-md",
    thumbnail:
      "/images/image6.jpg",
  },
];
