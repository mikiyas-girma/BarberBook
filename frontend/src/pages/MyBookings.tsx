import React from "react";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";

// Mock data for appointments
const appointments = [
  {
    id: 1,
    with: "With Barber John",
    date: new Date(2024, 9, 20, 14, 30),
    location: "4 Kilo Addis Ababa, Ethiopia",
  },
];

export default function UpcomingAppointments() {
  const [selectedAppointment, setSelectedAppointment] = React.useState<
    (typeof appointments)[0] | null>(null);

  return (
    <div className="font-space_grotesk bg-[#1f1f1f] min-h-screen">
        <div
          style={{
            background: "conic-gradient(from 120deg, #f59e0b, transparent)",
          }}
          className="mb-8"
        >
          <Header />
        </div>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Upcoming Appointments</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 min-h-96">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="flex flex-col bg-amber-900">
              <CardHeader>
                <CardTitle>{appointment.with}</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(appointment.date, "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="mr-2 h-4 w-4" />
                    {format(appointment.date, "h:mm a")}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 mt-1" />
                  <p className="text-sm text-muted-foreground">
                    {appointment.location}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-transparent shadow-xl">
                    <DialogHeader>
                      <DialogTitle>Appointment Details</DialogTitle>
                      <DialogDescription>
                        Review the details of your upcoming appointment.
                      </DialogDescription>
                    </DialogHeader>
                    {selectedAppointment && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {selectedAppointment.with}
                        </h3>
                        <p className="flex items-center mb-2">
                          <Calendar className="mr-2 h-4 w-4" />
                          {format(selectedAppointment.date, "MMMM d, yyyy")}
                        </p>
                        <p className="flex items-center mb-2">
                          <Clock className="mr-2 h-4 w-4" />
                          {format(selectedAppointment.date, "h:mm a")}
                        </p>
                        <p className="flex items-start mb-4">
                          <MapPin className="mr-2 h-4 w-4 mt-1" />
                          {selectedAppointment.location}
                        </p>
                      </div>
                    )}
                    <DialogFooter className="flex justify-between">
                      <Button variant="destructive">Cancel Appointment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div>
            <Footer />
        </div>  
    </div>
  );
}
