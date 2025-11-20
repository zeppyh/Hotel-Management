import "./error-page.css";

function ErrorPage() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
      </div>
    </div>
  );
}

export default ErrorPage;
