import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ToDo.module.css";
import axios from "axios";
import Label from "./Label";

function ToDo({ todoData, deleteHandler }) {
  // The state handling the data for the Todo item
  const [currentTodo, setCurrentTodo] = useState({ ...todoData });
  // State the indicates whether the item is in edit more or not
  const [isEditing, setIsEditing] = useState(false);
  // Handling the Todo text whenever it is in edit mode
  const [todoText, setTodoText] = useState(todoData.content);
  // A ref that is used for focusing the input field
  const inputRef = useRef(null);

  async function checkboxChangeHandler() {
    // Declare a resolved date based on the item completion
    const resolved = !currentTodo.completed ? new Date() : null;

    // Declare a new Todo item that will send an update to the DB
    const newTodo = {
      ...currentTodo,
      resolved: resolved,
      completed: !currentTodo.completed,
    };

    // Making the update to the DB
    try {
      const options = {
        method: "PUT",
        url: `http://localhost:3000/api/todos/${currentTodo._id}`,
        data: newTodo,
      };

      const response = await axios.request(options);
      if (response.status != 200) {
        throw new Error("Unable to update Todo");
      } else {
        // If everything is correct, update the current Todo state. Note that Mongo is configured to respond with the update item and NOT with the old value (which is the default behavior)
        setCurrentTodo({ ...response.data });
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // The Todo text edit mode handler
  function inputClickHandler() {
    // Don't allow editing if the item is completed
    if (!currentTodo.completed) {
      setIsEditing(true);
    }
  }

  // The Todo text edit handler
  function inputChangeHandler(e) {
    setTodoText(e.target.value);
  }

  // When the Todo input is unfocused (onBlur/the user clicks aways) or submitted (pressed enter)
  async function inputBlurAndSubmitHandler(e) {
    // For the submit ignore the page refresh (default)
    e.preventDefault();
    // Exit edit mode
    setIsEditing(false);

    // Don't make an update to the DB if there is no text
    if (todoText == "") {
      return;
    }
    // Declare the updated Todo object that will be sent to the DB
    const newTodo = {
      ...currentTodo,
      content: todoText,
    };

    try {
      const options = {
        method: "PUT",
        url: `http://localhost:3000/api/todos/${currentTodo._id}`,
        data: newTodo,
      };

      const response = await axios.request(options);

      if (response.status != 200) {
        throw new Error("Unable to update Todo");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Whenever the edit mode is on, focus the input field. That's because the default text is an h3. Clicking on it transforms it to an input that is not focused meaning that without the ref.current.focus() the user would need to click again in order to start editing the text
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.secondaryDiv}>
        <input
          type="checkbox"
          id="isChecked"
          className={styles.checkbox}
          checked={currentTodo.completed}
          onChange={checkboxChangeHandler}
        />

        {/* Based on the edit mode display the Todo content as an h3 or as an editable input field */}
        {isEditing ? (
          <form onSubmit={inputBlurAndSubmitHandler}>
            <input
              className={styles.input}
              value={todoText}
              onChange={inputChangeHandler}
              onBlur={inputBlurAndSubmitHandler}
              ref={inputRef}
              required
            />
          </form>
        ) : (
          <h3
            className={`${styles.content} ${
              currentTodo.completed ? styles.contentBlur : ""
            }`}
            onClick={inputClickHandler}
          >
            {todoText === "" ? todoData.content : todoText}
          </h3>
        )}
        {/* The delete button that uses the deleteHandler which is exctracted from the props */}
        <button
          onClick={() => deleteHandler(currentTodo._id)}
          className={styles.deleteButton}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      {/* An hr element which is styles as a strikethrough that is displayed and hidden along with a cool animation */}
      <hr
        className={`${styles.strikethrough} ${
          currentTodo.completed ? styles.strWidth : ""
        }`}
      />
      {/* A resolved label that indicates how long ago the item was completed */}
      <Label resolved={currentTodo.resolved} />
    </div>
  );
}

export default ToDo;
