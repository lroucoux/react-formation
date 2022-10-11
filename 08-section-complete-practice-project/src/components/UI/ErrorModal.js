import Card from "./Card";
import classes from "./ErrorModal.module.css";
import MyButton from "./MyButton";

import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onOkay} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.content}</p>
      </div>
      <footer className={classes.actions}>
        <MyButton onClick={props.onOkay}>Okay</MyButton>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onOkay={props.onOkay} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          content={props.content}
          onOkay={props.onOkay}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ErrorModal;
