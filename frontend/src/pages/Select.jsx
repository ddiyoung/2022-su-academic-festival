import React from "react";
import "../App.css";
import { questions } from "../questions";
import * as api from "../Api";
import { useState, useEffect, useRoutes } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Result from "./Result";

import {
  FOOD_CLASS_PARAMS,
  BIG_LABEL_PARAMS,
  SMALL_LABEL_PARAMS,
  IS_SPICY_PARAMS,
} from "../constants";
import Loading from "../loading/Loading";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Select() {
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [goback, setGoback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [countIndex, setCountIndex] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [foodClass, setFoodClass] = useState("");
  const [bigLabel, setBigLabel] = useState(0);
  const [smallLabel, setSmallLabel] = useState(0);
  const [isSpicy, setIsSpicy] = useState(false);
  const [isSoup, setIsSoup] = useState(false);
  const [responseList, setResponseList] = useState([0, 1, 2, 3, 4, 5]);
  const [prevResponseList, setPrevResponseList] = useState();

  let list = [0, 1, 2, 3, 4, 5];

  const startClick = async () => {
    setStart(true);
    await delay(1000);

    // question 번호 갱신
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  // 이전으로 되돌아가기
  const goBackClick = async (currentQuestion) => {
    setGoback(true);
    setCountIndex(-1);
    await delay(1000);

    setResponseList(prevResponseList);

    if (currentQuestion == 0) window.location.replace("/index");

    // question 번호 갱신
    const nextQuestion = currentQuestion - 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleClick = async (id, answer, idx) => {
    setLoading(true);
    setCountIndex(idx);
    await delay(1000);

    console.log("current" + currentQuestion);

    if (currentQuestion == 0) {
      setPrevResponseList(list);
      list = await api.api_food_class(answer);

      setResponseList(list);
      setFoodClass(answer);
    } else if (currentQuestion == 1) {
      setPrevResponseList(list);

      list = await api.api_big_label(FOOD_CLASS_PARAMS + foodClass, id);
      setResponseList(list);
      setBigLabel(id);
    } else if (currentQuestion == 2) {
      setPrevResponseList(list);

      list = await api.api_small_label(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        id
      );
      setResponseList(list);
      setSmallLabel(id);
    } else if (currentQuestion == 3) {
      setPrevResponseList(list);

      list = await api.api_is_spicy(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        SMALL_LABEL_PARAMS + smallLabel,
        id
      );
      console.log(idx);
      setResponseList(list);
      setIsSoup(id);
    } else if (currentQuestion == 4) {
      setPrevResponseList(list);

      list = await api.api_is_soup(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        SMALL_LABEL_PARAMS + smallLabel,
        IS_SPICY_PARAMS + isSpicy,
        id
      );
      setResponseList(list);
      setIsSoup(id);
    }
    setLoading(false);

    // question 번호 갱신
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };
  return (
    <div className="app">
      {loading ? <Loading /> : ""}
      {showResult ? (
        <>
          <Result list={responseList} />
          <section className="answer-section">
            {responseList.map((item, index) => (
              <button key={index} className="result horizontal-gradient">
                {item}
              </button>
            ))}
          </section>
          <br />
          <button
            className="footer goback"
            onClick={() => window.location.replace("/index")}
          >
            다시찾기
          </button>
        </>
      ) : (
        <>
          <img className="logo-small" alt="logo" src="images/logoOnly.png" />
          <br />
          <section className="question-section">
            <h1>
              Q{currentQuestion + 1}. {questions[currentQuestion].questionText}
            </h1>
          </section>
          <br />
          <section className="answer-section">
            {questions[currentQuestion].answerOptions
              .filter((item) => responseList.includes(item.id))
              .map((item, index) => (
                <button
                  key={index}
                  className={
                    countIndex == index ? "select buttonclicked" : "select"
                  }
                  onClick={() => handleClick(item.id, item.answerText, index)}
                >
                  {item.answerText}
                </button>
              ))}
          </section>
          <br />
          <button
            className="goback footer"
            onClick={() => goBackClick(currentQuestion)}
          >
            뒤로가기
          </button>
        </>
      )}
    </div>
  );
}
