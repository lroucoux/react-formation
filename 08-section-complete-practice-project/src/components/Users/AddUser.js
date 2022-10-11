import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import MyButton from "../UI/MyButton";

import classes from "./AddUser.module.css";

function AddUser(props) {
  // 2 façons de faire pour récupérer les valeurs des inputs : ref ou state
  // Ref : plutôt pour de la lecture (pas de modif) => moins de code à écrire
  const nameInputRef = useRef();
  // State : peut manipuler les données (les modifier) mais plus de code à écrire
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        content: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }

    // Le '+' permet de "caster" la string en nombre
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        content: "Please enter a valid age (> 0)",
      });
      return;
    }
    const newUser = {
      username: enteredName,
      age: enteredAge,
    };

    props.onAddUser(newUser);

    // Ici, on reset la valeur de la ref en manipulant directement le code : autorisé dans ce cas (reset du champ) mais c'est assez rare
    nameInputRef.current.value = "";
    setEnteredAge("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          content={error.content}
          onOkay={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          {/* Cet input est appelé un Uncontrolled component car son état n'est pas géré par React car on utlise une ref */}
          <input type="text" id="username" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          {/* Cet input est appelé un Controlled component car son état est géré par React via le useState */}
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <MyButton type="submit">Add user</MyButton>
        </form>
      </Card>
    </>
  );
}

export default AddUser;
