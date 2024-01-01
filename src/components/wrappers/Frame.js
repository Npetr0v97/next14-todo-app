import React from "react";
import styles from "./Frame.module.css";

// A wrapper to help with the content structure
export function Frame(props) {
  return <div className={styles.wrapper}>{props.children}</div>;
}

export default Frame;
