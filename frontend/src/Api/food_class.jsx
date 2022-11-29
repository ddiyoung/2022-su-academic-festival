import { SERVER, FOOD_CLASS_PATH, FOOD_CLASS_PARAMS } from "../constants";

// first question
export const api_food_class = async (data) => {
  var list;
  var url = SERVER + FOOD_CLASS_PATH + FOOD_CLASS_PARAMS + data;
  console.log(url);
  await fetch(SERVER + FOOD_CLASS_PATH + FOOD_CLASS_PARAMS + data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      list = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        list[i] = data[i].big_class_label;
      }
    });
  return list;
};
