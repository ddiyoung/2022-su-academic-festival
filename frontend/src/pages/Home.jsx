import React from "react";
import { useState } from "react";
import "../App.css";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [start, setStart] = useState(false);
  
  const startClick = async () => {
    setStart(true);
    await delay(1000);
    window.location.replace("/index");
  };

  return (
    <div className="center-location">
      <div className="app">
        <img className="logo-full" alt="logo" src="images/logoFull.png" />
        <br />
        <br />
        <br />
        <button
          className="start horizontal-gradient"
          onClick={() => startClick()}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
