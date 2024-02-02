import axios from "axios";
import HopPassionClient from "../../utils/NetworkingUtils";
import {
  handleUserLogin,
  getLoggedInUser,
  handleUserLogout,
  updateUserLocal,
} from "../../utils/UserUtils";
import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GET_USERS,
  SYNC_AUTH_STATE,
  GET_PRODUCTS_BYID,
  GET_PRODUCTS,
  LOADING_PRODUCT,
  CREATE_PRODUCT,
  GET_CATEGORIES,
  SET_FILTERS,
  SET_SEARCH_QUERY,
  GET_NEXT_PRODUCT_PAGE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_CART,
  GET_CART_REQUEST,
  GET_USER_INFO,
  UPDATE_USER,
  GET_REVIEWS,
  GET_TOTALSALES,
  GET_TOTAL_USERS,
  UPDATE_PRODUCT,
  CLEAN_REVIEWS,
  GET_REVIEWS_UNREVIEWED,
  REVIEW_PROCESSED,
  DELETE_REVIEW,
  GET_USER_BY_NAME,
  UPDATE_USER_STATE,
  CHANGE_PASSWORD,
} from "./actions-type";

export const changePassword = (id, password) => {
  return async function (dispatch) {
    try {
      await HopPassionClient.delete(`users/password/${id}`, password);
      return dispatch({
        type: CHANGE_PASSWORD,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteReview = (idReview) => {
  return async function (dispatch) {
    try {
      await HopPassionClient.delete(`/review/delete/${idReview}`);
      return dispatch({
        type: DELETE_REVIEW,
        payload: idReview,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const reviewProcessed = (idReview) => {
  return async function (dispatch) {
    try {
      const responre = await HopPassionClient.put(
        `/review/update/${idReview}`,
        {
          isReviewed: true,
        }
      );
      console.log(responre);
      return dispatch({
        type: REVIEW_PROCESSED,
        payload: idReview,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cleanReviews = () => {
  return function (dispatch) {
    return dispatch({
      type: CLEAN_REVIEWS,
    });
  };
};

export const getReviewsUnreviewed = () => {
  return async function (dispatch) {
    try {
      const { data } = await HopPassionClient.get(`/review/unreviewed`);
      return dispatch({
        type: GET_REVIEWS_UNREVIEWED,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getReviews = (idProd, idUsuario) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.get(
        `/review/list?idProd=${idProd}&idUsuario=${idUsuario}`
      );

      return dispatch({
        type: GET_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.get(`/users/allUsers`);
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signup = ({
  name,
  lastName,
  address,
  email,
  phone,
  password,
  city,
  postalCode,
  country,
}, callback) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/signup", {
        name,
        lastName,
        address,
        email,
        phone,
        password,
        city,
        postalCode,
        country,
      });
      handleUserLogin(response.data);
      callback()
      dispatch({
        type: SIGNUP,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const login = (userData, handleLoginError) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/signin", userData);
      handleUserLogin(response.data.token);
      dispatch({
        type: LOGIN,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleLoginError(error);
    }
  };
};

export const logout = () => {
  handleUserLogout();
  return { type: LOGOUT };
};

export const syncAuthState = () => {
  return { type: SYNC_AUTH_STATE, payload: getLoggedInUser() };
};

export function getProductById(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: LOADING_PRODUCT });
      const response = await HopPassionClient.get("/product/" + id);
      const productData = response.data;

      dispatch({
        type: GET_PRODUCTS_BYID,
        payload: productData,
      });
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
    }
  };
}

export const getProducts = (filters, query) => {
  return async (dispatch) => {
    try {
      try {
        const result = await HopPassionClient.get(
          buildGetProductsUrl(filters, query)
        );
        dispatch({ type: GET_PRODUCTS, payload: result.data });
      } catch (error) {
        console.log("no se encontraron coincidencias");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getNextProductPage = (filters, query, page) => {
  return async (dispatch) => {
    try {
      const result = await HopPassionClient.get(
        buildGetProductsUrl(filters, query, page + 1)
      );
      dispatch({ type: GET_NEXT_PRODUCT_PAGE, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const buildGetProductsUrl = (filters, query, page) => {
  let baseUrl = "/product/all?";
  const params = [];

  const addParam = (key, value) => {
    if (value) {
      params.push(`${key}=${encodeURIComponent(value)}`);
    }
  };

  addParam("country", filters.country);
  addParam("order", filters.order ? filters.order.id : null);
  addParam("category", filters.category ? filters.category.id : null);
  addParam("query", query);
  addParam("page", page);

  return baseUrl + params.join("&");
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.get("/categories/all");
      dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setFilters = (filters) => {
  return { type: SET_FILTERS, payload: filters };
};

export const setSearchQuery = (query) => {
  return { type: SET_SEARCH_QUERY, payload: query };
};

export const createProduct = ({
  name,
  image,
  description,
  country,
  category,
  price,
  stock,
  amountMl,
  alcoholContent,
}) => {
  return async function (dispatch) {
    try {
      await HopPassionClient.post("/product/create", {
        name,
        image,
        description,
        country,
        category,
        price,
        stock,
        amountMl,
        alcoholContent,
      });
      return dispatch({
        type: CREATE_PRODUCT,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getCart = () => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.get("/cart");
      dispatch({ type: GET_CART, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getCartRequest = () => {
  return { type: GET_CART_REQUEST };
};

export const addToCart = (id, quantity, callback) => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.put("/cart/set", {
        productId: id,
        quantity: quantity,
      });
      dispatch({ type: ADD_TO_CART, payload: response.data });
      callback(true);
    } catch (error) {
      console.log(error);
      callback(false);
    }
  };
};

export const removeFromCart = (id, callback) => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.put("/cart/set", {
        productId: id,
        quantity: 0,
      });
      dispatch({ type: REMOVE_FROM_CART, payload: response.data });
      callback(true);
    } catch (error) {
      console.log(error);
      callback(false);
    }
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const signupOauth2 = (userGoogleToken, handleSignupError) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/signup/oauth2.0", {
        tokenId: userGoogleToken,
      });

      handleUserLogin(response.data.message);

      return dispatch({
        type: LOGIN,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleSignupError(error);
    }
  };
};

export const loginOauth = (userCredentials, handleLoginError) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/login/oauth2.0", {
        tokenId: userCredentials,
      });

      handleUserLogin(response.data.token);

      return dispatch({
        type: LOGIN,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleLoginError();
    }
  };
};

export const getUserInfo = (id) => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.get(`/users/${id}`);
      if (response.status === 200) {
        const userData = {
          name: response.data.name || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          city: response.data.city || "",
          country: response.data.country || "",
          postalCode: response.data.postalCode || "",
          password: response.data.password || "",
        };

        dispatch({
          type: GET_USER_INFO,
          payload: userData,
        });

        return userData;
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error);
    }
  };
};

export const updateUser = (id, userData) => {
  return async (dispatch) => {
    try {
      if (!userData) {
        console.error("Los datos del usuario son inválidos.");
        return;
      }
      const response = await HopPassionClient.put(
        `/users/update/${id}`,
        userData
      );
      if (response.status === 200) {
        updateUserLocal(response.data.token);
        dispatch({ type: UPDATE_USER, payload: response.data.data });
        return response.data;
      } else {
        console.error("Error al actualizar el usuario:", response);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };
};

export const processPayment = async (formData) => {
  try {
    const response = await axios.post("/process_payment", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    throw error;
  }
};

export const getTotalSales = () => {
  return async (dispatch) => {
    try {
      const { data } = await HopPassionClient.get(
        "/stadistics/historixalTotalSales"
      );
      dispatch({
        type: GET_TOTALSALES,
        payload: data.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getTotalUsers = async () => {
  return async (dispatch) => {
    try {
      const { data } = await HopPassionClient.get("/stadistics/totalUsers");
      console.log("estos son los datos", data);
      dispatch({
        type: GET_TOTAL_USERS,
        payload: data.data,
      });
      return data.data;
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const updateProduct = (id, productData) => {
  return async (dispatch) => {
    try {
      if (!productData) {
        console.error("Los datos del producto son inválidos.");
        return;
      }

      console.log("Datos a enviar:", productData);

      const response = await HopPassionClient.put(
        `/product/${id}`,
        productData
      );
      console.log("Respuesta del servidor:", response.data);

      if (response.status === 200) {
        dispatch({ type: UPDATE_PRODUCT, payload: response.data });
        return response.data;
      } else {
        console.error("Error al actualizar el producto:", response);
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
};

export const getUserByName = (name) => {
  return async function (dispatch) {
    try {
      const info = await HopPassionClient.get(`users/allUsers?name=${name}`);
      const userName = info.data;
      if (!userName.length)
        throw Error(`No hay usuarios asociados con el nombre: ${name}`);
      return dispatch({
        type: GET_USER_BY_NAME,
        payload: userName,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const udateUserToken = (userData) => {
  return {
    type: UPDATE_USER_STATE,
    payload: userData,
  };
};
