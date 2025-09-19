import Header from "../components/Header";
import './ErrorPage.css'


function ErrorPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <div className="not-found-page">
        <h1 className="error">Sorry, page not found</h1>
      </div>
    </>
  );
}

export default ErrorPage;