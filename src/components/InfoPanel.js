import React, { useState } from "react";
import styles from "./InfoPanel.module.css";
import { useSelector } from "react-redux";
import { useFetchData } from "../hooks/useFetchData";
import { onClickIndexChanger } from "../../utils/helperFunctions";


// The panel on the left that is displaying the inspirational quotes
function InfoPanel() {
  // Fetch initial data from the Redux store
  const inspirationalQuoteData = useSelector(
    (state) => state.dashboardData.inspirationalQuoteArray
  );

  // Define state that will help with changing and rerendering quotes
  const [currentArrIndex, setCurrentArrIndex] = useState(0);

  // Axios options for the GET Request
  const inspQuoteOptions = {
    method: "GET",
    url: "https://olato-quotes.p.rapidapi.com/motivation",
    params: {
      quotes: "random quotes",
    },
    headers: {
      "X-RapidAPI-Key": "79a2ec61b7mshf8c268be9dea7c1p14b9dfjsnd963c6ef5fb1",
      "X-RapidAPI-Host": "olato-quotes.p.rapidapi.com",
    },
  };

  // Fetch data
  useFetchData(inspQuoteOptions, "QUOTE");

  return (
    <div
      className={styles.mainDiv}
      onClick={() => {
        onClickIndexChanger(
          currentArrIndex,
          inspirationalQuoteData.length,
          setCurrentArrIndex
        );
      }}
    >
      <h3 className={styles.title}>Inspirational Quote</h3>
      <p className={styles.content}>
        {inspirationalQuoteData[currentArrIndex].content}
      </p>
      <p className={styles.content}>
        Author: {inspirationalQuoteData[currentArrIndex].author}
      </p>
    </div>
  );
}

export default InfoPanel;
