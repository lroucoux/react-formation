import QuoteForm from "../components/quotes/QuoteForm";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      // push permet d'ajouter la page dans l'historique et donc de faire un retour arrière, contrairement au replace
      navigate("/quotes");
    }
  }, [status, navigate]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <section>
      <h1>New Quote</h1>
      <QuoteForm
        isLoading={status === "pending"}
        onAddQuote={addQuoteHandler}
      />
    </section>
  );
};

export default NewQuote;
