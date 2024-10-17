import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";

export default function Appointment() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string>("");

  return (
    <>
      <div className="bg-[#1f1f1f] font-space_grotesk ">
        <div
          style={{
            background: "conic-gradient(from 120deg, #f59e0b, transparent)",
          }}
          className="mb-8"
        >
          <Header />
        </div>
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg">
          {/* Left Section */}
          <div className="lg:w-1/2 text-white p-8 relative">
            <div className="absolute left-0 right-0 h-64">
              <div className="h-full">
                <div className="absolute left-0 right-0 h-40 "></div>
                <img
                  src="/images/3.jpg?height=256&width=512"
                  alt="Car Wash Illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">Book an  Appointment</h2>
            <p className="mb-6">
            To book an appointment with our barber,
            select an open date and time, and click on the "Book appointment" button.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"></div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="bg-transparent text-white border-amber-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="your phone number"
                    className="bg-transparent text-white border-amber-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your email address"
                    className="bg-transparent text-white border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium  mb-1"
                  >
                    Schedule date
                  </label>
                  <Popover>
                    <PopoverTrigger className="border-amber-500" asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal bg-transparent ${
                          !date && "text-muted-foreground bg-transparent"
                        }`}
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium mb-1"
                  >
                    Select a time
                  </label>
                  <Select onValueChange={setTime} value={time}>
                    <SelectTrigger className="bg-transparent border-amber-500">
                      <SelectValue
                        placeholder="Select a time"
                        className="bg-transparent"
                      />
                    </SelectTrigger>
                    <SelectContent className="">
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <SelectItem
                          key={hour}
                          value={`${hour.toString().padStart(2, "0")}:00`}
                        >
                          {`${hour.toString().padStart(2, "0")}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-amber-700 hover:bg-amber-600 text-white">
                Book appointment
              </Button>
            </form>
          </div>
        </div>
        <div>
            <Footer />
        </div>
      </div>
    </>
  );
}
