import styles from "./Label.module.css";

import { itemCompletedBefore } from "../../utils/helperFunctions";

// Hide and show when a Todo was completed with a Label. Label shown only when Todo is resolved
function Label({ resolved }) {
  return (
    <div
      className={`${styles.label} ${
        resolved !== null ? styles.labelShown : ""
      }`}
    >
      <b>{itemCompletedBefore(Date.parse(resolved))}</b>
    </div>
  );
}

export default Label;
