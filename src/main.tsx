import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App";

import Home from "./pages/Home";
import FullDetails from "./pages/FullDetails";

import { WantedGuysProvider } from "./context/WantedGuysContext";
import WilderTerminal from "./pages/WilderTerminal";



const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fulldetails/:id",
        element: <FullDetails />,
      },
      {
        path: "/wilder",
        element: <WilderTerminal />, // PAGE SECRÈTE
      }
    
    ],
  },
]);

// rendering

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(
    <WantedGuysProvider>
    <RouterProvider router={router} />
    </WantedGuysProvider>
  );
}