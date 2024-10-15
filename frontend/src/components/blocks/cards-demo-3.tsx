import { cn } from "@/lib/utils";

export function CardDemo() {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card w-72 h-80 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(images/image4.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 opacity-60 group-hover/card:backdrop-brightness-50 "></div>
        <div className="flex flex-row items-center space-x-4 z-10 ">
          <img
            height="100"
            width="100"
            src="/images/image5.jpg"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              Tamrat Tola
            </p>
          </div>
        </div>
        <div className="flex justify-center absolute bottom-0 right-1">
          <p className="font-normal border-amber-500 hover:bg-amber-600 text-sm text-gray-50 border inline-flex px-4 py-2 z-10 my-4">
            Book Now
          </p>
        </div>
      </div>
    </div>
  );
}
