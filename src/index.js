import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <React.StrictMode> */}
    <App />
    {/* <StarRating />
    <StarRating
    color={"red"}
    size={"24"}
    className={"test"}
    message={["verypoor", "poor", "good", "excellent", "outstanding"]}
    defaultRating={"3"}
    />
  <Rating /> */}
    {/* </React.StrictMode> */}
  </>
);
function Rating() {
  let otp = "";
  let digit = "1234567890";
  let alpha = "ABCDEFGabcdef";

  for (let i = 0; i < 3; i++) {
    otp += digit[Math.floor(Math.random() * 10)];
    otp += alpha[Math.floor(Math.random() * 10)];
  }
  console.log(otp);

  const [movieRating, setMovieRating] = useState(0);
  return (
    <>
      <StarRating onSetRating={setMovieRating} />
      <p>the movie was {movieRating} rated</p>
    </>
  );
}
