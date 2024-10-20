import React from "react";
import PathConstants from "./pathConstants";

const Home: React.FC = React.lazy(() => import('@/pages/Home'));
const Barbers: React.FC = React.lazy(() => import('@/pages/Barbers'));
const Booking: React.FC = React.lazy(() => import('@/pages/Booking'));
const Login: React.FC = React.lazy(() => import('@/pages/Login'));



const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.BARBERS, element: <Barbers /> },
    { path: PathConstants.BOOKING, element: <Booking /> },
    { path: PathConstants.LOGIN, element: <Login /> },
];

export default routes;
