export const NUMBER_OF_MILLISECONDS_IN_A_DAY = 86400000;

// API returns the whote quote and the author so the following two functions split and extract the content and author
export function extractContent(text) {
  return text.slice(0, text.lastIndexOf("-") - 1);
}

export function extractAuthor(text) {
  return text.slice((text.length - text.lastIndexOf("-") - 1) * -1);
}

// A helper function that helps with controling and chaning the currently displayed fact/quote
export function onClickIndexChanger(currentIndex, arrLength, setIndex) {
  if (currentIndex < arrLength - 1) {
    setIndex((prevState) => prevState + 1);
  } else {
    setIndex(0);
  }
}

// A helper function that returns a String indicating the amount a time that has passed after the Todo was completed
export function itemCompletedBefore(timeInMilliseconds) {
  //
  const itemCompletedBeforeMinutes =
    (new Date().getTime() - timeInMilliseconds) / 60000;
  let result;
  switch (true) {
    case itemCompletedBeforeMinutes < 60:
      result = "less than 1h ago";
      break;
    case itemCompletedBeforeMinutes >= 60 && itemCompletedBeforeMinutes < 1440:
      result = `${Math.floor(itemCompletedBeforeMinutes / 60, 1)}h ago`;
      break;
    case itemCompletedBeforeMinutes >= 1440:
      result = `${Math.floor(itemCompletedBeforeMinutes / 1440, 1)}d ago`;
      break;
  }

  return result;
}

//Helper method that will transfer the date String into a real Date
export function dateParser(dateString) {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; //Dates are 0-based
  const day = parseInt(dateParts[2], 10);

  const convertedDate = new Date(year, month, day);

  return convertedDate;
}
