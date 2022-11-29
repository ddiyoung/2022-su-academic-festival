import React from "react";
import "../App.css";
import { questions } from "../questions";
import UserInput from "./UserInput";
import * as api from "../Api";
import { useState, useEffect, useRoutes } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Result from "./Result";

import {
  FOOD_CLASS_PARAMS,
  BIG_LABEL_PARAMS,
  SMALL_LABEL_PARAMS,
  IS_SPICY_PARAMS,
  IS_SOUP_PARAMS,
} from "../constants";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [loading, setLoading] = useState(true);

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

  const handleClick = async (id, answer, idx) => {
    await setCountIndex(idx);

    await delay(1000);

    let list = [];
    await console.log("current" + currentQuestion);

    if (currentQuestion == 0) {
      list = await api.api_food_class(answer);
      await setResponseList(list);

      await setFoodClass(answer);
    } else if (currentQuestion == 1) {
      list = await api.api_big_label(FOOD_CLASS_PARAMS + foodClass, id);
      await setResponseList(list);

      await setBigLabel(id);
    } else if (currentQuestion == 2) {
      await alert(countIndex);
      list = await api.api_small_label(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        id
      );
      await console.log(list);
      await setResponseList(list);

      await setSmallLabel(id);
    } else if (currentQuestion == 3) {
      list = await api.api_is_spicy(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        SMALL_LABEL_PARAMS + smallLabel,
        id
      );
      console.log(idx);
      await setResponseList(list);

      await setIsSpicy(id);
    } else if (currentQuestion == 4) {
      list = await api.api_is_soup(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        SMALL_LABEL_PARAMS + smallLabel,
        IS_SPICY_PARAMS + isSpicy,
        id
      );
      await setResponseList(list);

      await setIsSoup(id);
    }
    // 선택한 것 업데이트
    await setSelections((selections) => [...selections, answer]);

    // question 번호 갱신
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      await setCurrentQuestion(nextQuestion);
    } else {
      await setShowResult(true);
    }
  };
  return (
    <div className="app">
      <BrowserView>
        <img className="logo" alt="logo" src="images/logoFull.png" />
        <br />
        <br />
        {showResult ? (
          <section className="showScore-section">
            <Result />
            {api.api_is_soup.map((item, index) => (
              <button key={index}>{item}</button>
            ))}
          </section>
        ) : (
          <>
            {currentQuestion < 0 ? (
              <section className="question-section">
                <button
                  className={start ? "buttonclicked" : ""}
                  onClick={() => startClick()}
                >
                  선택하기
                </button>
                <a href="/input">
                  <button>직접 입력하기</button>
                </a>
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
                        onClick={() =>
                          handleClick(item.id, item.answerText, index)
                        }
                      >
                        {item.answerText}
                      </button>
                    ))}
                  <button
                    className={goback ? "buttonclicked" : ""}
                    onClick={() => goBackClick()}
                  >
                    이전으로
                  </button>
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
            당신에게 {api.api_is_soup}을(를) 추천한다.
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
                        onClick={() =>
                          handleClick(item.id, item.answerText, index)
                        }
                      >
                        {item.answerText}
                      </mobilebutton>
                    )
                  )}
                  <button onClick={() => goBackClick()}>이전으로</button>
                </section>
              </>
            )}
          </>
        )}
      </MobileView>
    </div>
  );
}
