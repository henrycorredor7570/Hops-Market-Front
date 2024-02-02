import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate, isButtonDisabled } from "./validate";
import { login } from "../../redux/actions/actions";
import { useNavigate } from "react-router";
import style from "./Login.module.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import login_image from "../../assets/login_image.jpg";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";
import GoogleLoginOatuh2 from "./GoogleLogin/GoogleLogin";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";

export default function Login() {
  const clientId =
    "210577079376-bu8ig0s23lino9stujpaad72hmoaoqdh.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user == null) {
      return;
    }
    if (user.role === "admin") {
      navigate(`/adminprofile/${user.id}`);
    } else if (user.role === "user") {
      navigate("/");
    } 
  }, [user, navigate]);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const handleChange = (field, value) => {
    setData({
      ...userData,
      [field]: value,
    });

    setErrors(
      validate({
        ...userData,
        [field]: value,
      })
    );
  };

  function handleLoginError(error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error iniciando sesión, verifica tus credenciales o crea una cuenta!",
    });
    setData({
      email: "",
      password: "",
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(userData, () => handleLoginError()));
  };

  return (
    <Container className={style.container} fluid={true}>
      <NavBar />
      <Row>
        <Col md={6} className="text-left">
          <div className={style.formContainer}>
            <h2 className={style.title}>Iniciar sesión</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Correo electrónico:
                </Form.Label>
                <Form.Control
                  value={userData.email}
                  type="text"
                  placeholder="Ingresa tu correo electrónico"
                  onChange={(event) => {
                    handleChange("email", event.target.value);
                  }}
                  isInvalid={errors.email}
                  isValid={userData.email && !errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  <div>Controlar el formato del e-mail</div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Contraseña:
                </Form.Label>
                <Form.Control
                  value={userData.password}
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={(event) => {
                    handleChange("password", event.target.value);
                  }}
                  isInvalid={errors.password}
                  isValid={userData.password && !errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña debe contener 6 caracteres o más, una mayúscula
                  y un caracter especial.
                </Form.Control.Feedback>
              </Form.Group>
              <div className={style.buttons}>
                <button
                  className={style.btn}
                  variant="primary"
                  type="submit"
                  disabled={isButtonDisabled(errors, userData)}
                >
                  Ingresar
                </button>
                <GoogleLoginOatuh2
                  className={style.btGoogle}
                  clientId={clientId}
                  handleLoginError={handleLoginError}
                />
              </div>
              <div className={style.divider}></div>
              <div className={style.signup}>
                <p style={{ margin: "0" }}>¿No tenés una cuenta?</p>
                <Link className={style.link} to="/signup">
                  {" "}
                  Registrate
                </Link>
              </div>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <img src={login_image} alt="" className="img-fluid" />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
