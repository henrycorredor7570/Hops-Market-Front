import { useState, useEffect, useMemo } from "react";
import styles from "./UserProfileAddress.module.css";
import { mapUserToUserInfo } from "../../../utils/UserUtils";
import HopPassionClient from "../../../utils/NetworkingUtils";
import Loading from "../../Loading/Loading";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/actions";
import CountryList from "react-select-country-list";
import Select from "react-select";

const UserProfileAddress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryoptions = useMemo(() => CountryList().getData(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [userData, setUserData] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    setIsLoading(true);
    try {
      const response = await HopPassionClient.get(`/users/${id}`);
      setUserData(mapUserToUserInfo(response.data));
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error);
    }
  }

  function handleEditClick(editing) {
    setIsEditing(editing);
  }

  function handleInputChange(field, value) {
    let fieldValue = value;
    if (typeof value === "object" && value.label) {
      fieldValue = value.label;
      setEditableData({ ...editableData, [field]: fieldValue });
    } else {
      setEditableData({ ...editableData, [field]: event.target.value });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      dispatch(updateUser(id, editableData));
      setUserData({ ...userData, ...editableData });
      setIsEditing(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al actualizar los datos del usuario", error);
      setIsEditing(false);
      setIsLoading(false);
    }
  }

  function drawDefault() {
    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Mi dirección</h1>
        <div className={styles.rowContainer}>
          <div>
            <h4>Dirección</h4>
            <p>{userData.address}</p>
          </div>
          <div>
            <h4>Código Postal</h4>
            <p>{userData.postalCode}</p>
          </div>
        </div>
        <div className={styles.rowContainer}>
          <div>
            <h4>Ciudad</h4> <p>{userData.city}</p>
          </div>
          <div>
            <h4>País</h4> <p>{userData.country}</p>
          </div>
        </div>
        <button
          className={styles.editButton}
          onClick={() => handleEditClick(true)}
        >
          Editar
        </button>
      </div>
    );
  }

  function drawLoading() {
    return <Loading />;
  }

  function drawEditing() {
    return (
      <>
        <form onSubmit={handleSubmit} className={styles.updateForm}>
          <div className={styles.rowContainer}>
            <div>
              <h4>Calle</h4>
              <input
                type="text"
                name="address"
                onChange={(value) => handleInputChange("address", value)}
              />
            </div>
            <div>
              <h4>Código Postal</h4>
              <input
                type="text"
                name="postalCode"
                onChange={(value) => handleInputChange("postalCode", value)}
              />
            </div>
          </div>

          <div className={styles.rowContainer}>
            <div>
              <h4>Ciudad</h4>{" "}
              <input
                type="text"
                name="city"
                onChange={(value) => handleInputChange("city", value)}
              />
            </div>
            <div>
              <h4>País</h4>{" "}
              <Select
                className={styles.country}
                options={countryoptions}
                placeholder="Selecciona el país que corresponde"
                value={{
                  value: editableData.country,
                  label: editableData.country,
                }}
                onChange={(value) => handleInputChange("country", value)}
                name="country"
              />
            </div>
          </div>
          <button className={styles.saveButton} type="submit" value="Guardar">
            Guardar
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => handleEditClick(false)}
          >
            Cancelar
          </button>
        </form>
      </>
    );
  }

  function drawComponent() {
    if (isLoading) {
      return drawLoading();
    } else if (isEditing) {
      return drawEditing();
    } else {
      return drawDefault();
    }
  }

  return <>{drawComponent()}</>;
};

export default UserProfileAddress;
