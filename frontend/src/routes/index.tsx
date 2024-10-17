import React from "react";
import PathConstants from "./pathConstants";

const Home: React.FC = React.lazy(() => import('@/pages/Home'));
const Barbers: React.FC = React.lazy(() => import('@/pages/Barbers'));



const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.BARBERS, element: <Barbers /> },
];

export default routes;
