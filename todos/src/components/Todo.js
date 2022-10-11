import { useState } from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

function Todo({ text }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    console.log("clicked");
    console.log(text);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="card">
      <h2>{text}</h2>
      <div className="actions">
        <button className="btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      {modalIsOpen && <Modal closeModal={closeModal} />}
      {modalIsOpen && <Backdrop onClick={closeModal} />}
    </div>
  );
}

export default Todo;
