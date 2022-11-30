import { SERVER, IS_SOUP_PATH, IS_SOUP_PARAMS } from "../constants";

export const api_is_soup = async (Q1, Q2, Q3, Q4, data) => {
  var list;
  try {
    await fetch(
      SERVER +
      IS_SOUP_PATH +
      Q1 +
      "&" +
      Q2 +
      "&" +
      Q3 +
      "&" +
      Q4 +
      "&" +
      IS_SOUP_PARAMS +
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
        list = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
          list[i] = data[i].name;
        }
      });
    return list;
  } catch (e) {
    alert("ERROR!!");
    window.location.replace("/index");
  }
}

