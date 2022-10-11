import { Navigate, Route, Routes, Link } from "react-router-dom";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import NotFound from "./pages/NotFound";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  const loadCommentsBtn = (
    <div className="centered">
      <Link className="btn--flat" to="comments">
        Load comments
      </Link>
    </div>
  );

  const hideCommentsBtn = (
    <div className="centered">
      <Link className="btn--flat" to="..">
        Hide comments
      </Link>
    </div>
  );

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/quotes" />} />
        <Route path="/quotes" element={<AllQuotes />} />
        <Route path="/quotes/:quoteId" element={<QuoteDetail />}>
          <Route index element={loadCommentsBtn} />
          <Route
            path="comments"
            element={
              <>
                {hideCommentsBtn}
                <Comments />
              </>
            }
          />
        </Route>
        <Route path="/new-quote" element={<NewQuote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
