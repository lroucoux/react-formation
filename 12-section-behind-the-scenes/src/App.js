import React, { useCallback, useState } from "react";

import "./App.css";
import Button from "./components/UI/Button/Button";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  // Permet de sauvegarder la fonction onClickHandler pour que React n'ai pas à la recréer à chaque re-render
  const onClickHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {showParagraph && <p>This is new!</p>}
      <Button onClick={onClickHandler}>Click</Button>
    </div>
  );
}

export default App;
