"use client";
import Navbar from "@/components/Navbar";
import RunningTrackerForm from "@/components/RunningTrackerForm";
import axios from "axios";
import { useEffect, useState } from "react";
import RunningList from "@/components/RunningList";
export default function Home() {
  const [activityArray, setActivityArray] = useState([]);

  async function clickHandler() {
    console.log("Activities fetched");
    try {
      const options = {
        method: "DELETE",
        url: "/api/activities",
      };
      const response = await axios.request(options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    clickHandler2();
  }

  async function clickHandler2() {
    console.log(activityArray);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const options = {
          method: "GET",
          url: "/api/activities",
        };
        const response = await axios.request(options);
        setActivityArray(response.data.activities);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  //TODO LATER -> edit an activity by popping up the same form with the prefilled activity data that needs to be editted, delete an activity
  return (
    <div>
      <Navbar />
      <RunningTrackerForm updateActivityArray={setActivityArray} />
      <RunningList getActivityList={clickHandler2} />
    </div>
  );
}
