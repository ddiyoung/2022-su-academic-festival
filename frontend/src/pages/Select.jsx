import React from "react";
import "../App.css";
import { questions } from "../questions";
import Input from "./Input";
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

export default function Select() {
  const [loading, setLoading] = useState(true);

  const [start, setStart] = useState(false);
  const [goback, setGoback] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [countIndex, setCountIndex] = useState(-1);
  const [selections, setSelections] = useState([]);
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
  const goBackClick = async (currentQuestion) => {
    await setGoback(true);
    await delay(1000);

    await setResponseList(prevResponseList);

    if (currentQuestion == 0) window.location.replace("/");

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

    await console.log("current" + currentQuestion);

    if (currentQuestion == 0) {
      await setPrevResponseList(list);
      list = await api.api_food_class(answer);

      await setResponseList(list);
      await setFoodClass(answer);
    }
    else if (currentQuestion == 1) {
      await setPrevResponseList(list);

      list = await api.api_big_label(FOOD_CLASS_PARAMS + foodClass, id);
      await setResponseList(list);

      await setBigLabel(id);
    }
    else if (currentQuestion == 2) {
      await setPrevResponseList(list);

      list = await api.api_small_label(
        FOOD_CLASS_PARAMS + foodClass,
        BIG_LABEL_PARAMS + bigLabel,
        id
      );
      await setResponseList(list);

      await setSmallLabel(id);
    } else if (currentQuestion == 3) {
      await setPrevResponseList(list);

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
      await setPrevResponseList(list);

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
        {showResult ? (
          <>
            <section className="showScore-section">
              <Result list={responseList} />
              {responseList.map((item, index) => (
                <button key={index} className="select horizontal-gradient">
                  {item}
                </button>
              ))}
            </section>
            <button
              className={goback ? "footer goback" : "goback"}
              onClick={() => window.location.replace("/")}
            >
              다시찾기
            </button>
          </>
        ) : (
          <>
            <img className="logo" alt="logo" src="images/logoOnly.png" />
            <br />
            <section className="question-section">
              <h1>
                Q{currentQuestion + 1}.{questions[currentQuestion].questionText}
              </h1>
            </section>
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
              <button
                className={goback ? "footer goback" : "goback"}
                onClick={() => goBackClick(currentQuestion)}
              >
                뒤로가기
              </button>
            </section>
          </>
        )}
      </BrowserView>
    </div>
  );
}
