import React, { useContext, useRef } from "react";
import { TodosContext } from "../store/todos-context";
import classes from "./NewTodo.module.css";

const NewTodo: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const todosCtx = useContext(TodosContext);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // le ! permet de dire qu'on est sûr que inputRef.current ne sera jamais null ici
    // On peut également utiliser inputRef.current? si on n'est pas sûr que current ne soit pas null
    const enteredText = inputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    todosCtx.addTodo(enteredText);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="todoText">Todo text</label>
      <input type="text" id="todoText" ref={inputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
