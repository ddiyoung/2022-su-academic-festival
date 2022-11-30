import React from "react";
import { SERVER, USER_INPUT_PATH, USER_INPUT_PARAMS } from "../constants";
import "../App.css";
import Result from "../pages/Result";

// user input question
export const api_user_input = async (data) => {
  let list;
  try {
    await fetch(SERVER + USER_INPUT_PATH + USER_INPUT_PARAMS + data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          list = new Array(data.length);
          console.log(data.length);
          for (let i = 0; i < data.length; i++) {
            list[i] = data[i].name;
            console.log(list[i]);
          }
        } else {
          throw Error();
        }
      });
    return list;
  } catch (e) {
    console.log(e);
    return -1;
  }
};
