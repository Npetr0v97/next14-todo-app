"use client";
import styles from "./page.module.css";
import InfoPanel from "@/components/InfoPanel";
import Frame from "@/components/wrappers/Frame";
import ToDoList from "@/components/ToDoList.js";
import FactPanel from "@/components/FactPanel";
import { store } from "./store";
import { Provider } from "react-redux";
import { Ubuntu } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// A different font... because why not
const ubuntu = Ubuntu({ subsets: ["latin"], weight: "300" });

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    // Providing the Redux store to the whole app by default, even though it is used only for the InfoPanel and FactPanel components
    <Provider store={store}>
      <main className={`${styles.main} ${ubuntu.className}`}>
        {/* <button onClick={() => setIsVisible((prevState) => !prevState)}>
          Click
        </button>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className={styles.box}
              animate={{ x: 400 }}
              exit={{ scale: 2, opacity: 0 }}
            >
              Some text
            </motion.div>
          )}
        </AnimatePresence> */}
        <Frame>
          <InfoPanel />
          <FactPanel />
        </Frame>
        <ToDoList />
        {/* <Frame>
        </Frame> */}
      </main>
    </Provider>
  );
}
