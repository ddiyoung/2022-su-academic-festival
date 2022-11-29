import { SERVER, USER_INPUT_PATH, USER_INPUT_PARAMS } from "../constants";
import "../App.css";

// user input question
export const api_user_input = async (data) => {
  var list;
  await fetch(SERVER + USER_INPUT_PATH + USER_INPUT_PARAMS + data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      list = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        list[i] = data[i].name;
      }
    });
  return list;
};
