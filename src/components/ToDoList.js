import React, { useEffect } from "react";
import "./ToDoList.css";
import ToDo from "./ToDo";
import { useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { NUMBER_OF_MILLISECONDS_IN_A_DAY } from "../../utils/helperFunctions";

export function ToDoList() {
  // The state that will handle the input field
  const [todoText, setTodoText] = useState("");

  // The state that will handle the array on the frontend
  const [todosArray, setTodosArray] = useState([]);
  const [isToggledOldResolved, setisToggledOldResolved] = useState(true);

  // On mount fetch the list of all Todos from the Mongo database
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTodos() {
      const options = {
        method: "GET",
        url: "/api/todos",
        signal,
      };

      try {
        const response = await axios.request(options);

        if (response.status !== 200) {
          throw new Error("Failed to fetch Todos");
        }
        const todos = response.data.todos;

        // Set the state so the list can be displayed to the user
        setTodosArray([...todos]);
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();

    return () => {
      // Cleanup function

      controller.abort();
    };
  }, []);

  // Creating a new Todo
  async function submitHandler(event) {
    event.preventDefault();
    const newTodo = {
      content: todoText,
    };
    try {
      const postOptions = {
        method: "POST",
        url: "/api/todos",
        data: newTodo,
      };
      const response = await axios.request(postOptions);

      if (response.status !== 201) {
        throw new Error("Unable to create a new Todo");
      } else {
        // Reset the state for the input string
        setTodoText("");
        // Set the Todos array to the previous state plus the new Todo that was added
        setTodosArray((prevState) => [...prevState, response.data.response]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Deleting a Todo based on the id
  async function deleteHandler(id) {
    try {
      const options = {
        method: "DELETE",
        url: `/api/todos`,
        params: {
          id,
        },
      };

      const response = await axios.request(options);
      if (response.status != 200) {
        throw new Error("Unable to delete Todo");
      } else {
        const newArray = todosArray.filter((item) => item._id !== id);

        setTodosArray([...newArray]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // The handler for the user input
  function changeHandler(event) {
    setTodoText(event.target.value);
  }

  function returnFullListOfTodos() {
    return todosArray.map((todo, index) => {
      return (
        <ToDo
          key={todo._id}
          todoData={todo}
          deleteHandler={deleteHandler}
          itemCount={index}
        />
      );
    });
  }

  function returnTodosWithoutOldItems() {
    return todosArray
      .filter((todo) => {
        if (todo.resolved === null) {
          return true;
        } else {
          return (
            (new Date() - Date.parse(todo.resolved)) /
              NUMBER_OF_MILLISECONDS_IN_A_DAY <
            2
          );
        }
      })
      .map((todo, index) => {
        return (
          <ToDo
            key={todo._id}
            todoData={todo}
            deleteHandler={deleteHandler}
            itemCount={index}
          />
        );
      });
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="form__group">
        <input
          type="input"
          className="form__field"
          placeholder="Name"
          name="todo"
          id="todo"
          value={todoText}
          onChange={changeHandler}
          required
        />
        <label htmlFor="todo" className="form__label">
          Write your ToDo
        </label>
      </form>
      <div>
        <div
          className={`toggle__text ${
            isToggledOldResolved ? "toggle__text_off" : "toggle__text_on"
          }`}
          onClick={() => setisToggledOldResolved((prevState) => !prevState)}
        >
          {/* The toggle button that hides/shows old resolved items */}
          {isToggledOldResolved ? "Hide" : "Show"} items that were resolved 2
          days ago
        </div>
        {/* Iterating over the todosArray in order to generate the items. Pass the delete handler function as a prop along with  the todo data for the respective item */}
        {/* Adding motion effects for the exit animation via AnimatePresence */}
        <AnimatePresence>
          {isToggledOldResolved
            ? returnFullListOfTodos()
            : returnTodosWithoutOldItems()}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ToDoList;
