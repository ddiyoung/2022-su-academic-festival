import { SERVER, SMALL_LABEL_PATH, SMALL_LABEL_PARAMS } from "../constants";

// third question
export const api_small_label = async (Q1, Q2, data) => {
  var list;
  var url = SERVER + SMALL_LABEL_PATH + Q1 + "&" + Q2 + "&" + SMALL_LABEL_PARAMS + data;
  //await console.log(data);
  //await console.log(url);
  await fetch(
    SERVER + SMALL_LABEL_PATH + Q1 + "&" + Q2 + "&" + SMALL_LABEL_PARAMS + data,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      list = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        list[i] = data[i].is_spicy;
      }
    });
  return list;
};
