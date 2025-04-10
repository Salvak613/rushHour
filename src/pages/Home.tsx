import TV from "../components/TV"; 
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";



 

const Home = () => {

  const navigate = useNavigate();
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
     

      setKeySequence((prev) => {
        const newSeq = [...prev, key].slice(-5); // garder 5 dernières lettres
        if (newSeq.join("") === "WILD") {
          navigate("/wilder"); // redirige
        }
        return newSeq;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

    return (
      <div>
        <TV/>
      </div>
    );
  };
  
  export default Home; // Ensure this line exists