import { SERVER, IS_SPICY_PATH, IS_SPICY_PARAMS } from "../constants";

// fourth question
export const api_is_spicy = async (Q1, Q2, Q3, data) => {
  var list;
  await fetch(
    SERVER +
      IS_SPICY_PATH +
      Q1 +
      "&" +
      Q2 +
      "&" +
      Q3 +
      "&" +
      IS_SPICY_PARAMS +
      data,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      alert(data);
      alert(data.length);
      list = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        list[i] = data[i].is_soup;
      }
    });
  return list;
};
