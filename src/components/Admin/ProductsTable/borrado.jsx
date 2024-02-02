import { useState } from "react";
import style from "./Borrado.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import HopPassionClient from "../../../utils/NetworkingUtils";
import { useEffect } from "react";

const Borrado = ({ id }) => {
  const [isDelete, setIsDelete] = useState(true);

  useEffect(() => {
    const petition = async () => {
      const response = await HopPassionClient.get(`/product/${id}`);
      console.log(response.data.isDeleted);
      if (response.data.isDeleted) {
        setIsDelete(true);
      } else {
        setIsDelete(false);
      }
    };
    petition();
  }, []);

  const handleAction = async () => {
    if (isDelete) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Estas seguro?",
          text: "Este producto sera inhabilitado!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si bloquear!",
          cancelButtonText: "No cancelar",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Bloqueado!",
              "El producto fue bloqueado.",
              "success"
            );
            console.log("esta activado");
            HopPassionClient.delete(`/product/${id}`).then((response) => {
              console.log("se bloqueo");
              console.log("respuesta", response.data);
              if (response.status === 200) {
                setIsDelete(false);
              } else {
                console.log("algo fallo");
              }
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelado",
              "Tu producto esta a salvo",
              "error"
            );
          }
        });
    } else {
      console.log("esta bloqueado");
      const response = await HopPassionClient.post(`/product/${id}`);
      if (response.status === 200) {
        console.log("se activo");
        console.log("respuesta", response.data);
        setIsDelete(true);
      } else {
        console.log("algo fallo");
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleAction}
        className={isDelete ? style.desactivar : style.activar}
      >
        {isDelete ? "Desactivar" : "Activar"}
      </button>
    </div>
  );
};

export default Borrado;
