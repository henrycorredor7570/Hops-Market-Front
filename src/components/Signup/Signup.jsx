import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate, isButtonDisabled } from "./validate";
import { useNavigate } from "react-router-dom";
import { signup, getUsers } from "../../redux/actions/actions";
import style from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import signup_img from "../../assets/signup_img.jpg";
import GoogleSignUp from "./GoogleSignUp/GoogleSignUp";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CountryList from "react-select-country-list";
import Select from "react-select";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countryoptions = useMemo(() => CountryList().getData(), []);

  const [userData, setData] = useState({
    name: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [errors, setErrors] = useState(validate(userData));
  const clientId =
    "210577079376-bu8ig0s23lino9stujpaad72hmoaoqdh.apps.googleusercontent.com";

  const handleChange = (field, value) => {
    let fieldValue = value;

    // Extract the country name if the value is an object
    if (typeof value === "object" && value.label) {
      fieldValue = value.label;
    }

    setData({
      ...userData,
      [field]: fieldValue,
    });

    setErrors(
      validate({
        ...userData,
        [field]: fieldValue,
      })
    );
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    dispatch(signup(userData, () => {
      Swal.fire({
        icon: "success",
        title: "Usuario creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    }));
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);



  return (
    <Container className={style.container} fluid={true}>
      <NavBar />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <img src={signup_img} alt="" className="img-fluid" />
        </Col>

        <Col md={6}>
          <div className={style.formContainer}>
            <h2 className={style.title}>Registro</h2>
            <div className={style.divider}></div>
            <div className={style.button}>
              <GoogleSignUp clientId={clientId} />
            </div>
            <div className={style.divider}></div>
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Nombre:
                </Form.Label>
                <Form.Control
                  value={userData.name}
                  type="text"
                  placeholder="Ingresa tu nombre"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("name", event.target.value);
                  }}
                  isInvalid={errors.name}
                  isValid={userData.name && !errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  <div>
                    El nombre debe tener al menos dos letras y no puede incluir
                    números.
                  </div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Apellido:
                </Form.Label>
                <Form.Control
                  value={userData.lastName}
                  type="text"
                  placeholder="Ingresa tu apellido"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("lastName", event.target.value);
                  }}
                  isInvalid={errors.lastName}
                  isValid={userData.lastName && !errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  <div>
                    El apellido debe tener al menos dos letras y no puede
                    incluir números.
                  </div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Correo electrónico:
                </Form.Label>
                <Form.Control
                  value={userData.email}
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("email", event.target.value);
                  }}
                  isInvalid={errors.email}
                  isValid={userData.email && !errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Formato incorrecto de correo electrónico.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="country">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  País de origen
                </Form.Label>
                <Select
                  options={countryoptions}
                  placeholder="Selecciona el país que corresponde"
                  value={{
                    value: userData.country,
                    label: userData.country,
                  }}
                  onChange={(selectedOption) =>
                    handleChange("country", selectedOption)
                  }
                  name="country"
                />
                <Form.Control.Feedback type="invalid">
                  <div>Ingrese un país válido</div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="city">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Ciudad:
                </Form.Label>
                <Form.Control
                  value={userData.city}
                  type="text"
                  placeholder="Ingresa tu ciudad"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("city", event.target.value);
                  }}
                  isInvalid={errors.city}
                  isValid={userData.city && !errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  <div>Solo se permiten letras</div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Domicilio:
                </Form.Label>
                <Form.Control
                  value={userData.address}
                  type="text"
                  placeholder="Ingresa calle y número"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("address", event.target.value);
                  }}
                  isInvalid={errors.address}
                  isValid={userData.address && !errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  <div>Ingrese el domicilio en formato alfanumérico válido</div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Codigo postal:
                </Form.Label>
                <Form.Control
                  value={userData.postalCode}
                  type="text"
                  placeholder="Ingresa tu codigo postal"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("postalCode", event.target.value);
                  }}
                  isInvalid={errors.postalCode}
                  isValid={userData.postalCode && !errors.postalCode}
                />
                <Form.Control.Feedback type="invalid">
                  <div>Ingrese un codigo postal válido</div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Telefono:
                </Form.Label>
                <Form.Control
                  value={userData.phone}
                  type="text"
                  placeholder="Ingresa tu telefono"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("phone", event.target.value);
                  }}
                  isInvalid={errors.phone}
                  isValid={userData.phone && !errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  <div>Ingrese un numero válido</div>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label style={{ fontSize: "12pt", color: "#818181" }}>
                  Contraseña:
                </Form.Label>
                <Form.Control
                  value={userData.password}
                  type="password"
                  placeholder="Crea tu contraseña"
                  className={style.formControl}
                  onChange={(event) => {
                    handleChange("password", event.target.value);
                  }}
                  isInvalid={errors.password}
                  isValid={userData.password && !errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña debe contener 6 carácteres o más, una mayúscula,
                  un número y un caracter especial.
                </Form.Control.Feedback>
              </Form.Group>

              <button
                className={style.btn}
                variant="primary"
                type="submit"
                disabled={isButtonDisabled(errors, userData)}
              >
                Crear cuenta
              </button>
            </Form>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
