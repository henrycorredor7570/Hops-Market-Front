import { useState } from "react";
import Swal from "sweetalert2";
import style from "./ChangePassword.module.css";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/actions/actions";

const ChangePassword = ({ user }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState({ password: "" });
  const [error, setError] = useState({
    contraseña: "Por favor ingrese la contraseña",
  });

  const handleEditClick = () => {
    if (!error.contraseña && isEditing) {
      console.log(user.id, input);
      dispatch(changePassword(user.id, input));
      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada",
        text: "La contraseña se ha cambiado exitosamente.",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let errorMessage = "";
    if (value.length < 6) {
      errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    } else if (value.length > 10) {
      errorMessage = "La contraseña no debe exceder los 10 caracteres.";
    } else if (!/[A-Z]/.test(value)) {
      errorMessage =
        "La contraseña debe contener al menos una letra mayúscula.";
    } else if (!/[@#$%^&*]/.test(value)) {
      errorMessage =
        "La contraseña debe contener al menos un caracter especial (@#$%^&*).";
    }

    setError({ ...error, contraseña: errorMessage });
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.changeContainer}>
        <div className={style.data}>
          <div className={style.subtitle}>Cambiar Contraseña</div>
          <label className={style.label}>Contraseña:</label>
          {isEditing ? (
            <div className={style.input}>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
              {error.contraseña && (
                <p className={style.error}>{error.contraseña}</p>
              )}
            </div>
          ) : (
            <span className={style.label}>***</span>
          )}
          <button className={style.btn} onClick={handleEditClick}>
            {isEditing ? "Guardar" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
