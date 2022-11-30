import React from "react";
import { useState } from "react";
import "../App.css";
import { api_user_input } from "../Api/user_input";
import Result from "./Result";
import Loading from "../loading/Loading";

export default function Input() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [inputmsg, setInputmsg] = useState("");
  const [responseList, setResponseList] = useState([]);

  let list = [""];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(inputmsg);

    list = await api_user_input(inputmsg);
    console.log(list);
    setResponseList(list);
    setClicked(true);
    setLoading(false);
  };

  const handleChange = (e) => {
    setInputmsg(e.target.value);
  };

  return (
    <div className="app">
      {loading ? <Loading /> : ""}
      {!clicked ? (
        <>
          <img className="logo-full" alt="logo" src="images/logoOnly.png" />
          <h1>원하는 음식의 스타일을 말해주세요!</h1>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              className="user-input"
              name="inputmsg"
              placeholder="내용을 입력해주세요."
              value={inputmsg}
              onChange={handleChange}
            />
            <br />
            <br/>
            <br />
            <div className="center">
              <button className="select" type="submit">
                전송
              </button>
            </div>
          </form>
          <div className="center">
            <button
              className="goback footer"
              onClick={() => window.location.replace("/")}
            >
              뒤로가기
            </button>
          </div>
        </>
      ) : (
        <>
          <Result list={responseList} />
          {responseList != -1 ? (
            <>
              <h3>{inputmsg}에 대한 결과입니다.</h3>
              <section className="answer-section">
                {responseList.map((item, index) => (
                  <div className="result horizontal-gradient" key={index}>
                    {item}
                  </div>
                ))}
              </section>
            </>
          ) : (
            <>
              <div className="refind">FOODICE와 함께 다시 찾아볼까요?</div>
              <button
                className="footer goback"
                onClick={() => window.location.replace("/input")}
              >
                다시찾기
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
