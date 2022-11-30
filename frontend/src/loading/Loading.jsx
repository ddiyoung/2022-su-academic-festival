import React from "react";
import { Background, LoadingText } from "./style";

export default () => {
  return (
    <Background>
      <img src="/images/spinner.gif" alt="로딩중" width="5%" />
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
    </Background>
  );
};
