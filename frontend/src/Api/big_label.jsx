import { SERVER, BIG_LABEL_PATH, BIG_LABEL_PARAMS } from "../constants";

// second question
export const api_big_label = async (Q1, data) => {
  var list;
  // debugging
  // var url = SERVER + BIG_LABEL_PATH + Q1 + "&" + BIG_LABEL_PARAMS + data;
  // await console.log(url);
  try {
    await fetch(SERVER + BIG_LABEL_PATH + Q1 + "&" + BIG_LABEL_PARAMS + data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          list = new Array(data.length);
          for (let i = 0; i < data.length; i++) {
            list[i] = data[i].label_hierarchy;
          }
        } else {
          throw Error();
        }
      });
    return list;
  } catch (e) {
      alert("server error");
      return window.location.replace("/index");    
  }
};
