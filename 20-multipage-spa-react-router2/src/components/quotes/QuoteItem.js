import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

import useHttp from "../../hooks/use-http";
import { deleteQuote } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useEffect } from "react";

const QuoteItem = (props) => {
  const { sendRequest, status, error } = useHttp(deleteQuote);

  const { onDeleteQuote } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onDeleteQuote();
    }
  }, [error, onDeleteQuote, status]);

  const deleteQuoteHandler = () => {
    sendRequest(props.id);
  };

  return (
    <li className={classes.item}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {status !== "pending" && (
        <>
          <figure>
            <blockquote>
              <p>{props.text}</p>
            </blockquote>
            <figcaption>{props.author}</figcaption>
          </figure>
          <Link className="btn" to={`/quotes/${props.id}`}>
            View Fullscreen
          </Link>
          <button onClick={deleteQuoteHandler} className="btn">
            Delete Quote
          </button>
        </>
      )}
    </li>
  );
};

export default QuoteItem;
