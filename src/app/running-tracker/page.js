"use client";
import Navbar from "@/components/Navbar";
import RunningTrackerForm from "@/components/RunningTrackerForm";
import axios from "axios";
export default function Home() {
  async function clickHandler() {
    console.log("Activity Created");
    try {
      const options = {
        method: "POST",
        url: "/api/activities",
      };
      const response = await axios.request(options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function clickHandler2() {
    console.log("Activities fetched");
    try {
      const options = {
        method: "GET",
        url: "/api/activities",
      };
      const response = await axios.request(options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  //TODO add the list of activities (Just a mockup)
  //TODO LATER -> edit an activity by popping up the same form with the prefilled activity data that needs to be editted, delete an activity
  return (
    <div>
      <Navbar />
      <RunningTrackerForm />
      <h1>In construction :)</h1>
      <h2>...an imaginary map</h2>
      <h2 onClick={clickHandler2}>...an imaginary list of activities</h2>
    </div>
  );
}
