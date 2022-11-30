import React from "react";
import { useState } from "react";
import "../App.css";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Index() {
  const [start, setStart] = useState(false);
  const [selected, setSelected] = useState(false);

  const selectClick = async () => {
    setSelected(true);
    await delay(1000);
  };

  return (
    <body>
      <div className="app">
        <img className="logo-full" alt="logo" src="images/logoFull.png" />
        <br />
        <br />
        <br />
        <section className="answer-section">
          <a href="/select">
            <button
              className={selected ? "select buttonclicked" : "select"}
              onClick={() => selectClick()}
            >
              선택하기
            </button>
          </a>
          <a href="/input">
            <button className="select">직접 입력하기</button>
          </a>
        </section>
      </div>
    </body>
  );
}
