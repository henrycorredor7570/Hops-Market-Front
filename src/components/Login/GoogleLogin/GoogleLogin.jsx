import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { loginOauth } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import style from "./GoogleLogin.module.css"
const GoogleLoginOatuh2 = (props) => {
  const { clientId, handleLoginError } = props;
  const dispatch = useDispatch();

  const onSuccess = (response) => {
    console.log(response);
    const { tokenId } = response;
    dispatch(loginOauth(tokenId, handleLoginError));
  };
  const onFailure = (error) => {
    handleLoginError(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Ingresar con Google"
      className={style.button}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginOatuh2;
