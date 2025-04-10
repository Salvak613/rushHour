import React, { useState, useContext } from "react";
import "./TV.css";
import { WantedGuysContext } from "../context/WantedGuysContext";
import { WantedGuy } from "../model/WantedGuy";

const TV: React.FC = () => {
  const { data: wantedGuys, loading, error, setCurrentGuy, currentGuy } = useContext(WantedGuysContext);
 
  const showRandomGuy = () => {
    if (wantedGuys.length === 0) return;
    const randomIndex = Math.floor(Math.random() * wantedGuys.length);
    const guy = wantedGuys[randomIndex];
    setCurrentGuy(guy); 
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur lors du chargement : {error}</p>;

  return (
    <>
      <div className="allBox">
        <div className="monitor">
          <div className="screen">
            <div className="crt">
              <div className="terminal">
                {currentGuy ? (
                  <div className="currentGuy">
                    <h1>
                      {currentGuy.title}
                    </h1>
                    <img
                      className="img"
                      src={currentGuy.image || "placeholder.jpg"}
                      alt="Wanted"
                    />
                    <p className="asv">
                      BIRTH :{" "}
                      {currentGuy.datesOfBirthUsed.length > 0
                        ? currentGuy.datesOfBirthUsed
                        : "N/A"}{" "}
                      | SEX : {currentGuy.sex} | RACE : {currentGuy.race} |
                      STATUS :{" "}
                      {currentGuy.status !== "na"
                        ? currentGuy.status
                        : "Uncaught"}
                      <br />
                      TYPES : {currentGuy.types}
                      <br /> REWARD : {currentGuy.reward_text}
                    </p>
                  </div>
                ) : (
                  <p>PUSH THE BUTTON</p>
                )}
              </div>
              <div className="vline"></div>
            </div>
            <div className="scan-line"></div>
          </div>
          <button className="anotherWanted" onClick={showRandomGuy}>Another Wanted</button>
        </div>
        <div className="clipboard-box">
          <img
            className="clipboard"
            src="src/assets/clipboard.png"
            alt="clipboard"
          />
          {currentGuy && (
            <p className="caution">
              {currentGuy.details === "N/A" ? "No details." : currentGuy.details}
            </p>
          )}
        </div>
        <div className="post-it">
          <h3>
            {currentGuy &&
              (currentGuy.warningMessage === "N/A"
                ? "BE CAREFULL"
                : currentGuy.warningMessage)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default TV;