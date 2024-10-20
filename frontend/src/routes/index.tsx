import React from "react";
import PathConstants from "./pathConstants";

const Home: React.FC = React.lazy(() => import('@/pages/Home'));
const Barbers: React.FC = React.lazy(() => import('@/pages/Barbers'));
const Booking: React.FC = React.lazy(() => import('@/pages/Booking'));
const Signup: React.FC = React.lazy(() => import('@/pages/Signup'));



const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.BARBERS, element: <Barbers /> },
    { path: PathConstants.BOOKING, element: <Booking /> },
    { path: PathConstants.SIGNUP, element: <Signup /> },
];

export default routes;
