import React from "react";
import "./App.css";
import { questions } from "./questions";
import UserInput from "./UserInput";
import * as api from "./Api";
import { useState, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import {
  FOOD_CLASS_PARAMS,
  BIG_LABEL_PARAMS,
  SMALL_LABEL_PARAMS,
  IS_SPICY_PARAMS,
  IS_SOUP_PARAMS,
} from "./constants";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [start, setStart] = useState(false);
  const [goback, setGoback] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [countIndex, setCountIndex] = useState(-1);
  const [selections, setSelections] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const [foodClass, setFoodClass] = useState("");
  const [bigLabel, setBigLabel] = useState(0);
  const [smallLabel, setSmallLabel] = useState(0);
  const [isSpicy, setIsSpicy] = useState(false);
  const [isSoup, setIsSoup] = useState(false);

  const [responseList, setResponseList] = useState([0, 1, 2, 3, 4, 5]);

  const startClick = async () => {
    await setStart(true);
    await delay(1000);

    // question 번호 갱신
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      await setCurrentQuestion(nextQuestion);
    } else {
      await setShowResult(true);
    }
  };

  // 이전으로 되돌아가기
  const goBackClick = async () => {
    await setGoback(true);
    await delay(1000);

    // question 번호 갱신
    const nextQuestion = currentQuestion - 1;
    if (nextQuestion < questions.length) {
      await setCurrentQuestion(nextQuestion);
    } else {
      await setShowResult(true);
    }
  };

  const handleClick = async (data, idx) => {
    await setCountIndex(idx);

    await delay(1000);

    let list = [];
    let i = 0;

    if (countIndex == -1) {
      list = await api.api_food_class(data);
      setResponseList(list);

      setFoodClass(data);
    } else if (countIndex == 0) {
      list = await api.api_big_label(FOOD_CLASS_PARAMS + foodClass, idx);
      setResponseList(list);

      setBigLabel(data);
    } else if (countIndex == 1) {
      list = await api.api_small_label(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        idx
      );
      setResponseList(list);

      setSmallLabel(data);
    } else if (countIndex == 2) {
      list = await api.api_is_spicy(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        SMALL_LABEL_PARAMS + smallLabel,
        data
      );
      setResponseList(list);
      alert(list);

      setIsSpicy(data);
    } else if (countIndex == 3) {
      list = await api.api_is_soup(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        SMALL_LABEL_PARAMS + smallLabel,
        IS_SPICY_PARAMS + isSpicy,
        data
      );
      setResponseList(list);

      setIsSoup(data);
    }
    // 선택한 것 업데이트
    await setSelections((selections) => [...selections, data]);

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
      {/*<Route path="/big_label/{}" element={<Login />} />*/}
      <BrowserView>
        <img className="logo" alt="logo" src="images/logoOnly.png" />
        {showResult ? (
          <section className="showScore-section">
            당신에게 {selections}을(를) 추천한다.
          </section>
        ) : (
          <>
            {currentQuestion < 0 ? (
              <section className="question-section">
                <h1>오늘 뭐 드실?</h1>
                <button
                  className={start ? "buttonclicked" : ""}
                  onClick={() => startClick()}
                >
                  시작하기
                </button>
                <UserInput />
              </section>
            ) : (
              <>
                <section className="question-section">
                  <h1>
                    Q{currentQuestion + 1}.
                    {questions[currentQuestion].questionText}
                  </h1>
                </section>
                <section className="answer-section">
                  {questions[currentQuestion].answerOptions
                    .filter((item) => responseList.includes(item.id))
                    .map((item, index) => (
                      <button
                        key={index}
                        className={countIndex == index ? "buttonclicked" : ""}
                        onClick={() => handleClick(item.answerText, index)}
                      >
                        {item.answerText}
                      </button>
                    ))}
                  <goBack
                    className={goback ? "buttonclicked" : ""}
                    onClick={() => goBackClick()}
                  >
                    이전으로
                  </goBack>
                </section>
              </>
            )}
          </>
        )}
      </BrowserView>
      <MobileView>
        <img className="mobile-logo" alt="logo" src="images/logoOnly.png" />
        {showResult ? (
          <section className="showScore-section">
            당신에게 {selections}을(를) 추천한다.
          </section>
        ) : (
          <>
            {currentQuestion < 0 ? (
              <section className="question-section">
                <h2>오늘 뭐 드실?</h2>
                <mobilebutton
                  className={start ? "buttonclicked" : ""}
                  onClick={() => startClick()}
                >
                  시작하기
                </mobilebutton>
              </section>
            ) : (
              <>
                <section className="question-section">
                  <h2>
                    Q{currentQuestion + 1}.
                    {questions[currentQuestion].questionText}
                  </h2>
                </section>
                <section className="mobile-answer-section">
                  {questions[currentQuestion].answerOptions.map(
                    (item, index) => (
                      <mobilebutton
                        key={index}
                        className={countIndex == index ? "buttonclicked" : ""}
                        onClick={() => handleClick(item.answerText, index)}
                      >
                        {item.answerText}
                      </mobilebutton>
                    )
                  )}
                  <goBack onClick={() => goBackClick()}>이전으로</goBack>
                </section>
              </>
            )}
          </>
        )}
      </MobileView>
    </div>
  );
}
