import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import "./Notfound.css";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <h1 className="tittle">404 Error Page</h1>
      <p className="zoom-area">
        Lo sentimos, esta pagina no se encuentra disponible.{" "}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/">
          <a className="more-link">Volver a la pagina principal</a>
        </Link>
      </div>
      <Footer />
    </>
  );
}
