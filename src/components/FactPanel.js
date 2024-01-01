import React, { useState } from "react";
import styles from "./FactPanel.module.css";
import { useSelector } from "react-redux";
import { useFetchData } from "../hooks/useFetchData";
import { onClickIndexChanger } from "../../utils/helperFunctions";

// The panel on the right that is displaying the interesting quotes
function FactPanel() {
  // Fetch initial data from the Redux store
  const interestingFactData = useSelector(
    (state) => state.dashboardData.interestingFactArray
  );

  // Define state that will help with changing and rerendering quotes
  const [currentArrIndex, setCurrentArrIndex] = useState(0);

  // Axios options for the GET Request
  const interestingFactOptions = {
    method: "GET",
    url: "https://numbersapi.p.rapidapi.com/random/trivia",
    params: {
      min: "0",
      max: "100",
      fragment: "false",
      json: "true",
    },
    headers: {
      "X-RapidAPI-Key": "79a2ec61b7mshf8c268be9dea7c1p14b9dfjsnd963c6ef5fb1",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };

  // Fetch data
  useFetchData(interestingFactOptions, "FACT");

  return (
    <div
      className={styles.mainDiv}
      onClick={() => {
        onClickIndexChanger(
          currentArrIndex,
          interestingFactData.length,
          setCurrentArrIndex
        );
      }}
    >
      <h3 className={styles.title}>Interesting Fact</h3>
      <p className={styles.content}>
        {interestingFactData[currentArrIndex].content}
      </p>
    </div>
  );
}

export default FactPanel;
