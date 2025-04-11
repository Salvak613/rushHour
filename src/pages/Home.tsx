import TV from "../components/TV"; 
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


 

const Home = () => {

  const navigate = useNavigate();
  const setKeySequence = useState<string[]>([])[1];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
     

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

    return (
      <div>
        
        <TV/>
      </div>
    );
  };
  
  export default Home;