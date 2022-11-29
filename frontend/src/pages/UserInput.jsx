import React from "react";
import { useState } from "react";
import "../App.css";
import { api_user_input } from "../Api/user_input";
import { useEffect } from "react";
import Result from "./Result";

export default function UserInput() {
  const [clicked, setClicked] = useState(false);
  const [inputmsg, setInputmsg] = useState("");
  const [responseList, setResponseList] = useState([]);

  let list = [""];

  const handleSubmit = async (e) => {
    e.preventDefault();
    list = await api_user_input(inputmsg);
    await setResponseList(list);
    setClicked(true);
  };

  const handleChange = (e) => {
    setInputmsg(e.target.value);
  };

  return (
    <div className="app">
      {!clicked ? (
        <form onSubmit={handleSubmit}>
          <input
            name="inputmsg"
            placeholder="입력해주세요."
            value={inputmsg}
            onChange={handleChange}
          />
          <button type="submit">전송</button>
        </form>
      ) : (
        <>
          <Result />
          <h2>{inputmsg}에 대한 결과입니다.</h2>
          <section className="answer-section">
            {responseList.map((item, index) => (
              <button key={index}>{item}</button>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
