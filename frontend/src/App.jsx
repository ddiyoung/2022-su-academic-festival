import React from "react";
import "./App.css";
import { questions } from "./questions";
import { useState } from 'react';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function App() {
  const [start, setStart] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(-1);
  const [countIndex, setCountIndex] = React.useState(-1);
  const [selections, setSelections] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);

  const startClick = async() => {
    setStart(true);
    await delay(1000);
      // question 번호 갱신
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  }

  const handleClick = async (data, idx) => {
    setCountIndex(idx);
    await delay(1000);

    // 선택한 것 업데이트
    setSelections(selections => [...selections, data]);
   
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
        <img className="logo" alt="logo" src="images/logoOnly.png"/>
      {showResult ? (
        <section className="showScore-section">
          당신에게 {selections}을(를) 추천한다.
        </section>
        ) : 
        <>
          {(currentQuestion<0) ? (
          <section className="question-section">
              <h1>오늘 뭐 드실?</h1>
            <button className={start?"buttonclicked":""} onClick={() => startClick()} >시작하기</button>
          </section>
          ) : (
          <>
          <section className="question-section">
            <h1>Q{currentQuestion + 1}.{questions[currentQuestion].questionText}</h1>
          </section>           
          <section className="answer-section">
            {questions[currentQuestion].answerOptions.map((item, index) => (              
              <button
                key={index}
                className={(countIndex == index)?"buttonclicked":""}
                onClick={() => handleClick(item.answerText, index)}
              >
                {item.answerText}
              </button>
            ))}
          </section>  
          </>
        )}
        </>
      }
    </div>
  );
}
