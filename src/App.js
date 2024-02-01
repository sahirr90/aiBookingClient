import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FaIconName } from 'react-icons/fa';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

const Layout=()=>{
  return(
    <><Header /><ScrollRestoration/><Outlet /><Footer /></>
  );
};
const router = createBrowserRouter([
  {
  path:"/",
  element: <Layout />,
  children: [
    {
      path:"/",
      element: <Login/>,
      
    },
    {
      path:"/home",
      element:<Home />,
    },
    
  ],
},
]);
function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
