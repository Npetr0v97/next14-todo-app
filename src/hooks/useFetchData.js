import { useEffect } from "react";
import {
  setInspirationalQuote,
  setInterestingFact,
} from "../../features/dashboardData/dashboardData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { extractContent, extractAuthor } from "../../utils/helperFunctions";

// A Custom Hook that fetches the required data for the inspirational quote and interesting fact panels
export function useFetchData(options, choice) {
  //The data will be dispatched to the Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    // Defining a controller and a signal that will do the cleanup in the useEffect
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      const finalArray = [];

      // Fetching the last date when the data was last retrieved from the API or setting a default date
      const lastDate =
        new Date(JSON.parse(localStorage.getItem("lastDate"))) ||
        new Date(1900, 0, 1);
      const currentDate = new Date();

      // Checking if the last date is equal to Today or not
      if (
        currentDate.getDate() === lastDate.getDate() &&
        currentDate.getMonth() === lastDate.getMonth() &&
        currentDate.getFullYear() === lastDate.getFullYear()
      ) {
        // In case it is, then fetch what we already have stored in the Local storage...
        const inspirationalQuoteArray = JSON.parse(
          localStorage.getItem("inspirationalQuoteArray")
        );
        const interestingFactArray = JSON.parse(
          localStorage.getItem("interestingFactArray")
        );
        // ... and dispatch it to Redux so it can be reflected in the UI
        dispatch(setInspirationalQuote([...inspirationalQuoteArray]));
        dispatch(setInterestingFact([...interestingFactArray]));
        // and abandon (return from) the rest of the function
        return;
      }

      // However, if it's a different day (e.g. data last retrieved yesterday) then it means we need to fetch new quotes and facts from  the API
      const finalOptions = { ...options, signal };

      // A try-catch block that tries to populate the array with 3 quotes or facts (depends on which component the Custom Hook was called in)
      try {
        while (finalArray.length !== 3) {
          // Requires 3 iterations because the API cannot fetch a set amount of items. Each response contains only 1 item
          const response = await axios.request(finalOptions);

          // An extra parameter that indicates which component the Custom Hook was called in
          if (choice === "QUOTE") {
            const { quote } = response.data;
            const author = extractAuthor(quote);
            const content = extractContent(quote);

            // If the array is empty, push the results into it
            if (finalArray.length == 0) {
              finalArray.push({ content, author });
            } else if (!finalArray.some((el) => el.content === content)) {
              // If the array isn't empty, check if the items is already in (so we don't have duplicate items)
              finalArray.push({ content, author });
            }

            if (finalArray.length == 3) {
              // When we have 3 items, dispatch them to Redux and store the new array in the local storage
              localStorage.setItem(
                "inspirationalQuoteArray",
                JSON.stringify([...finalArray])
              );
              dispatch(setInspirationalQuote([...finalArray]));
              break;
            }
          } else if (choice === "FACT") {
            // Similar logic like the QUOTE algorithm
            const factsObj = response.data;
            const content = `${factsObj.number} is ${factsObj.text}.`;
            //If the array is empty, push the results into it
            if (finalArray.length == 0) {
              finalArray.push({ content });
            } else if (!finalArray.some((el) => el.content === content)) {
              // If the array isn't empty, check if the items is already in (so we don't have duplicate items)
              finalArray.push({ content });
            }

            if (finalArray.length == 3) {
              localStorage.setItem(
                "interestingFactArray",
                JSON.stringify([...finalArray])
              );
              dispatch(setInterestingFact([...finalArray]));
              break;
            }
          }
        }
        // Once the data is dispatched and saved to the Local Storage, set a new "last date" when the data was retrieved
        localStorage.setItem("lastDate", JSON.stringify(currentDate));
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
    return () => {
      // Cleanup function

      controller.abort();
    };
  }, []);
}
