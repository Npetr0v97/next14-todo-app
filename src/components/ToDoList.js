import React, { useEffect } from "react";
import "./ToDoList.css";
import ToDo from "./ToDo";
import { useState } from "react";
import axios from "axios";

export function ToDoList() {
  // The state that will handle the input field
  const [todoText, setTodoText] = useState("");

  // The state that will handle the array on the frontend, prepopulated with a dummy item
  const [todosArray, setTodosArray] = useState([
    {
      content: "Pending load...",
      completed: false,
      _id: "xxx",
      resolved: null,
    },
  ]);

  // On mount fetch the list of all Todos from the Mongo database
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTodos() {
      const options = {
        method: "GET",
        url: "http://localhost:3000/api/todos",
        signal,
      };
      try {
        const response = await axios.request(options);

        if (response.statusText !== "OK") {
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
        url: "http://localhost:3000/api/todos",
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
        url: `http://localhost:3000/api/todos`,
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
        {/* Iterating over the todosArray in order to generate the items. Pass the delete handler function as a prop along with  the todo data for the respective item */}
        {todosArray.map((todo) => {
          return (
            <ToDo
              key={todo._id}
              todoData={todo}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ToDoList;
