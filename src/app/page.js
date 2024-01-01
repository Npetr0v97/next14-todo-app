"use client";
import styles from "./page.module.css";
import InfoPanel from "@/components/InfoPanel";
import Frame from "@/components/wrappers/Frame";
import ToDoList from "@/components/ToDoList.js";
import FactPanel from "@/components/FactPanel";
import { store } from "./store";
import { Provider } from "react-redux";
import { Ubuntu } from "next/font/google";

// A different font... because why not
const ubuntu = Ubuntu({ subsets: ["latin"], weight: "300" });

export default function Home() {
  return (
    // Providing the Redux store to the whole app by default, even though it is used only for the InfoPanel and FactPanel components
    <Provider store={store}>
      <main className={`${styles.main} ${ubuntu.className}`}>
        <Frame>
          <InfoPanel />
          <FactPanel />
        </Frame>
        <Frame>
          <ToDoList />
        </Frame>
      </main>
    </Provider>
  );
}
