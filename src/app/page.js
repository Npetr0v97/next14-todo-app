"use client";
import InfoPanel from "@/components/InfoPanel";
import Frame from "@/components/wrappers/Frame";
import ToDoList from "@/components/ToDoList.js";
import FactPanel from "@/components/FactPanel";
import Navbar from "@/components/Navbar";
import { store } from "./store";
import { Provider } from "react-redux";



//TODO
// New page for activities
// Generate a list of activities
// Ability to add a new activitity
// Have charts with metrics
export default function Home() {

  return (
    // Providing the Redux store to the whole app by default, even though it is used only for the InfoPanel and FactPanel components
    <Provider store={store}>
        <Navbar/>
        <Frame>
          <InfoPanel />
          <FactPanel />
        </Frame>
        <ToDoList />
    </Provider>
  );
}
