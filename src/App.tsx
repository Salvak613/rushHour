import './App.css';

import { Link, Outlet } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { WantedGuysContext } from "./context/WantedGuysContext";



function App() {
  const { currentGuy } = useContext(WantedGuysContext);
  const navigate = useNavigate();
  const location = useLocation();
  const setKeySequence = useState<string[]>([])[1];


  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      console.log(key)


      setKeySequence((prev) => {
        const newSeq = [...prev, key].slice(-5);
        if (newSeq.join("") === "WILD") {
          navigate("/wilder");
        }
        return newSeq;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  useEffect(() => {
    const bodyClass = location.pathname === "/wilder"
      ? "wilder-background"
      : location.pathname === "/"
      ? "home-background"
      : "default-background";

    document.body.className = bodyClass;

    return () => {
      document.body.className = "";
    };
  }, [location.pathname]);



  return (
    <div >
      <nav className="navBar">
      {location.pathname.startsWith("/fulldetails") && (
        <Link to="/"><button className="fullCase">
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front text"> 
          Return</span>
          </button>
        </Link>
      )}
       {location.pathname === "/"  && ( // Affiche le bouton seulement après un clic
          <Link to={`fulldetails/${currentGuy?.id || "defaultId"}`}>
            <button className="fullCase">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> 
                Full Case
              </span>
            </button>
          </Link>
      )}
    </nav>
      <main>
        <h2 className="neumorphic-text">FBI <br /> CONTROL PANNEL</h2>
        <div className="light"></div>
        <Outlet />
      </main>
    </div>
  );
}

export default App;