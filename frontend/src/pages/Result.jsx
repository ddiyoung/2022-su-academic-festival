import React from "react";
import "../App.css";

export default function Result(props) {
  console.log(props.list);
  return (
    <>
      <img className="logo" alt="logo" src="images/logoOnly.png" />
      <br />
      {props.list!=null? (
        <h3>FOODICE가 사용자에 맞는 음식을 찾았습니다!</h3>
      ) : (
        <h3>FOODICE가 사용자에 맞는 음식을 찾지 못했습니다!</h3>
      )}
      <br />
    </>
  );
}
