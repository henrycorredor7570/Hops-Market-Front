import React from "react";
import Swal from "sweetalert2";
import { checkAgeConfirmation, setAgeConfirmation } from "../../utils/UserUtils";

const Alert18 = () => {

  const confirmAge = () => {
    if (checkAgeConfirmation()) {
      return
    }

    Swal.fire({
      title: "Confirmación de Edad",
      text: "Por favor, confirma que sos mayor de 18 años para continuar.",
      icon: "success",
      confirmButtonText: "Si, soy mayor",
      denyButtonText: 'Todavía no',
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setAgeConfirmation(true)
      } else {
        window.location.replace('https://www.google.com');
      }
    });
  };

  return (
    <div>
      { confirmAge() }
    </div>
  );
};

export default Alert18;



