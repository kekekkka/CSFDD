import {
    createBrowserRouter,
  } from "react-router-dom";
import Index from "../pages/Index";
 
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Index/>
    },
    {
      path: "/blog",
      element: <div>blog</div>,
    },
  ]);