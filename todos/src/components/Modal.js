function Modal({ closeModal }) {
  return (
    <div className="modal">
      <p>Are you Sure ?</p>
      <button className="btn btn--alt" onClick={closeModal}>
        Cancel
      </button>
      <button className="btn btn--alt" onClick={closeModal}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
