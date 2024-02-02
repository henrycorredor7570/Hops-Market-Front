import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";
import logo_light from "../../assets/logo_light.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, logout } from "../../redux/actions/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Person,
  PersonPlus,
  PersonGear,
  PersonSlash,
  Cart,
} from "react-bootstrap-icons";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const query = useSelector((state) => state.query);
  const cart = useSelector((state) => state.cart);

  const [input, setInput] = useState("");

  function handleSearch() {
    dispatch(setSearchQuery(input));
    setInput("");
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  function profileLink() {
    if (user.role == "admin") {
      return `/adminprofile/${user.id}`;
    } else if (user.role == "user") {
      return `/profile/${user.id}`;
    }
  }

  function drawUserSection() {
    if (user) {
      return (
        <>
          <Link to="/cart" className={style.text}>
            <Cart className={style.icon} />
            <p>
              {cart.products && cart.products.length !== 0
                ? cart.products.length
                : null}
            </p>
          </Link>

          <Link to={profileLink()} className={style.text}>
            <PersonGear className={style.icon} />
            <p>{user.name}</p>
          </Link>

          {/* <button onClick={handleLogout}>Cerrar Seción</button> */}
          <Link onClick={handleLogout} to="/" className={style.text}>
            <PersonSlash className={style.icon} />
            <p>Cerrar sesión</p>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className={style.text}>
            <Person className={style.icon} />
            <p>Iniciar Sesión</p>
          </Link>
          <Link to="/signup" className={style.text}>
            <PersonPlus className={style.icon} />
            <p>Registrarse</p>
          </Link>
        </>
      );
    }
  }

  return (
    <div className={style.mainContainer}>
      <Navbar className={style.container}>
        <Link to="/" className={style.logoLink}>
          <img src={logo_light} alt="" className={style.logoLight} />
        </Link>

        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className={style.collapsedContent}
            id="basic-navbar-nav"
          >
            <Nav className={style.navContent}>
              <FormControl
                className={style.searchField}
                type="text"
                placeholder="Busca tu cerveza favorita"
                value={input} // Use the 'input' state as the input field's value
                onChange={handleInputChange}
              />
              <button
                className={style.searchButton}
                type="button" // Use type="button" to prevent form submission
                onClick={handleSearch}
              >
                Buscar
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
        {drawUserSection()}
      </Navbar>
    </div>
  );
}
