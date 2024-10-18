import React from "react";
import PathConstants from "./pathConstants";

const Home: React.FC = React.lazy(() => import('@/pages/Home'));
const Barbers: React.FC = React.lazy(() => import('@/pages/Barbers'));
const Booking: React.FC = React.lazy(() => import('@/pages/Booking'));
const MyBookings: React.FC = React.lazy(() => import('@/pages/MyBookings'));



const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.BARBERS, element: <Barbers /> },
    { path: PathConstants.BOOKING, element: <Booking /> },
    { path: PathConstants.MyBookings, element: <MyBookings /> },
];

export default routes;
