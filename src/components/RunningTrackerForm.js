import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import styles from "./RunningTrackerForm.module.css";
import { dateParser } from "../../utils/helperFunctions";

function RunningTrackerForm() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [elevationGain, setElevationGain] = useState("");
  const [activityType, setActivityType] = useState("");

  function closeModalHandler() {
    setModalIsVisible(false);
  }
  function openModalHandler() {
    setModalIsVisible(true);
  }

  function escPress(event) {
    if (event.key === "Escape") {
      setModalIsVisible(false);
    }
  }

  const handleRadioChange = (event) => {
    setActivityType(event.target.value);
  };

  function submitHandler(e) {
    //TODO modify the handler to create a new activity
    e.preventDefault();
    console.log(
      location,
      dateParser(date),
      distance,
      elevationGain,
      activityType
    );
    setModalIsVisible(false);
    setLocation("");
    setDate("");
    setDistance("");
    setElevationGain("");
    setActivityType("");
    alert("Under construction. Stay tuned :)");
  }

  useEffect(() => {
    document.addEventListener("keydown", escPress);

    return () => {
      document.removeEventListener("keydown", escPress);
    };
  }, []);

  return (
    <>
      <span className={styles.create_button} onClick={openModalHandler}>
        <FontAwesomeIcon icon={faCirclePlus} /> Create
      </span>
      <div
        className={`${styles.overlay} ${modalIsVisible ? "" : styles.v_hide}`}
        onClick={closeModalHandler}
      ></div>

      <form
        className={`${styles.form_window} ${
          modalIsVisible ? styles.v_show : ""
        }`}
        onSubmit={submitHandler}
      >
        <div className={styles.x_icon}>
          <FontAwesomeIcon
            icon={faX}
            className={styles.x_icon_scaler}
            onClick={closeModalHandler}
          />
        </div>
        <div className={styles.form_sort}>
          <div className={styles.child_div}>
            <label className={styles.label} htmlFor="location">
              Location:
            </label>
            <input
              className={styles.input}
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className={styles.child_div}>
            <label className={styles.label} htmlFor="distance">
              Distance (km):
            </label>
            <input
              className={styles.input}
              type="number"
              id="distance"
              name="distance"
              min="0"
              max="300"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </div>
          <div className={styles.child_div}>
            <label className={styles.label} htmlFor="date">
              Date:
            </label>
            <input
              className={styles.input}
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.child_div}>
            <label className={styles.label} htmlFor="elevationGain">
              Total Elevation Gain (m):
            </label>
            <input
              className={styles.input}
              type="number"
              id="elevationGain"
              name="elevationGain"
              min="0"
              max="50000"
              value={elevationGain}
              onChange={(e) => setElevationGain(e.target.value)}
              required
            />
          </div>
        </div>

        <label className={styles.label}>Activity Type:</label>
        <div>
          <input
            className={styles.radio_items}
            type="radio"
            id="running"
            name="activityType"
            value="Running"
            checked={activityType === "Running"}
            onChange={handleRadioChange}
            required
          />
          <label className={styles.label_items} htmlFor="running">
            Running
          </label>

          <input
            className={styles.radio_items}
            type="radio"
            id="trailRunning"
            name="activityType"
            value="Trail Running"
            checked={activityType === "Trail Running"}
            onChange={handleRadioChange}
            required
          />
          <label className={styles.label_items} htmlFor="trailRunning">
            Trail Running
          </label>

          <input
            className={styles.radio_items}
            type="radio"
            id="treadmillRunning"
            name="activityType"
            value="Treadmill Running"
            checked={activityType === "Treadmill Running"}
            onChange={handleRadioChange}
            required
          />
          <label className={styles.label_items} htmlFor="treadmillRunning">
            Treadmill Running
          </label>
        </div>

        <button className={styles.submit_button} type="submit">
          Create Activity
        </button>
      </form>
    </>
  );
}

export default RunningTrackerForm;
