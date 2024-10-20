import React, { useState } from "react";
import {
  LuCircle,
  LuBarChart,
  LuHome,
  LuMenu,
  LuSettings,
  LuUsers,
  LuX,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const SidebarItem = ({
    icon: Icon,
    text,
  }: {
    icon: React.ElementType;
    text: string;
  }) => (
    <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-space_grotesk">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <LuX className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-4 text-gray-900">
          <ul className="space-y-2 px-4">
            <SidebarItem icon={LuHome} text="Home" />
            <SidebarItem icon={LuBarChart} text="Appointments" />
            <SidebarItem icon={LuUsers} text="Services" />
            <SidebarItem icon={LuUsers} text="Calendar" />
            <SidebarItem icon={LuUsers} text="Profile" />
            <SidebarItem icon={LuSettings} text="Settings" />
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-20">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <LuMenu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
            <div className="flex items-center">
              {/* Add user profile or other header items here */}
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium mx-auto">
                    Appointments
                  </CardTitle>
                  <LuBarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-around">
                    <div>
                      {" "}
                      <div className="text-xl font-bold">10</div>
                      <p className="text-xs text-muted-foreground">today</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold">10</div>
                      <p className="text-xs text-muted-foreground">This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Customers
                  </CardTitle>
                  <LuUsers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+20</div>
                  <p className="text-xs text-muted-foreground">
                    +50.1% from last month
                  </p>
                </CardContent>
              </Card>
            <Card className="relative overflow-hidden">
                <img
                    src="/images/image4.jpg"
                    alt="Portfolio Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Manage Portfolio</CardTitle>
                    <LuSettings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="relative">
                    <div className="text-2xl font-bold">Portfolio</div>
                    <p className="text-xs text-muted-foreground">Quick access to manage your portfolio</p>
                </CardContent>
            </Card>
              </div>
              <Card className="my-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Next Appointments
                  </CardTitle>
                  <LuCircle className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="grid grid-cols-4 gap-4">
                      <span className="col-span-1">John Doe</span>
                      <span className="col-span-1">10:00 AM</span>
                      <span className="col-span-1">(123) 456-7890</span>
                      <span className="col-span-1 text-green-200">Confirmed</span>
                    </li>
                    <li className="grid grid-cols-4 gap-4">
                      <span className="col-span-1">Jane Smith</span>
                      <span className="col-span-1">11:30 AM</span>
                      <span className="col-span-1">(987) 654-3210</span>
                      <span className="col-span-1 text-yellow-200">Pending</span>
                    </li>
                    <li className="grid grid-cols-4 gap-4">
                      <span className="col-span-1">Michael Brown</span>
                      <span className="col-span-1">1:00 PM</span>
                      <span className="col-span-1">(555) 123-4567</span>
                      <span className="col-span-1 text-red-200">Cancelled</span>
                    </li>
                    <li className="grid grid-cols-4 gap-4">
                      <span className="col-span-1">Emily Davis</span>
                      <span className="col-span-1">2:30 PM</span>
                      <span className="col-span-1">(444) 987-6543</span>
                      <span className="col-span-1 text-green-200">Confirmed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
          
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
