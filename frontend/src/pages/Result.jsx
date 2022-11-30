import React from "react";
import "../App.css";

export default function Result(props) {
  console.log(props);
  return (
    <>
      <img className="logo-small" alt="logo" src="images/logoOnly.png" />
      <br />
      {props.list!=-1 ? (
        <h1>FOODICE가 사용자에 맞는 음식을 찾았습니다!</h1>
      ) : (
        <h1>FOODICE가 사용자에 맞는 음식을 찾지 못했습니다!</h1>
      )}
      <br />
    </>
  );
}
