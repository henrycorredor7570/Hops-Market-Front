// import { getLoggedInUser } from "./../../utils/UserUtils";
import {
  emptyCart,
  mergeCart,
  setCart,
  startSyncing,
} from "../../utils/CartUtils";
import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  SYNC_AUTH_STATE,
  GET_PRODUCTS_BYID,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  GET_CATEGORIES,
  SET_FILTERS,
  SET_SEARCH_QUERY,
  GET_NEXT_PRODUCT_PAGE,
  GET_CART,
  GET_CART_REQUEST,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  MERCADOPAGO,
  GET_USER_INFO,
  GET_USERS,
  DELETE_PRODUCTS,
  GET_REVIEWS,
  GET_TOTALSALES,
  GET_TOTAL_USERS,
  UPDATE_PRODUCT,
  CLEAN_REVIEWS,
  GET_REVIEWS_UNREVIEWED,
  REVIEW_PROCESSED,
  DELETE_REVIEW,
  UPDATE_USER,
  GET_USER_BY_NAME,
  UPDATE_USER_STATE,
  CHANGE_PASSWORD,
} from "../actions/actions-type";

import { getLoggedInUser } from "../../utils/UserUtils";

const initialState = {
  //user: getLoggedInUser(),
  users: [],
  //user: null,
  user: getLoggedInUser(),
  productDetails: {},
  products: null,
  isLoading: false,
  quantity: 1,
  categories: {},
  filters: {},
  query: null,
  cart: emptyCart(),
  paymentStatus: null,
  userInfo: {},
  orderDetails: [],
  reviewList: [],
  totalSales: 0,
  totalUsers: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
      };
    case DELETE_REVIEW: {
      const updatedReviewList = state.reviewList.filter(
        (review) => review.id !== action.payload
      );
      return {
        ...state,
        reviewList: updatedReviewList,
      };
    }
    case REVIEW_PROCESSED: {
      const updatedReviewList = state.reviewList.filter(
        (review) => review.id !== action.payload
      );
      return {
        ...state,
        reviewList: updatedReviewList,
      };
    }
    case GET_REVIEWS_UNREVIEWED:
      return {
        ...state,
        reviewList: action.payload,
      };

    case CLEAN_REVIEWS:
      return {
        ...state,
        reviewList: [],
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviewList: action.payload,
      };
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SYNC_AUTH_STATE:
      return {
        ...state,
        user: action.payload,
      };
    case GET_PRODUCTS_BYID:
      return {
        ...state,
        productDetails: action.payload,
        isLoading: false,
        quantity: 1,
      };

    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
      };

    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case DELETE_PRODUCTS:
      return {
        ...state,
        products: [],
      };

    case GET_NEXT_PRODUCT_PAGE: {
      const list = (state.products ? state.products.products : []).concat(
        action.payload.products
      );
      return {
        ...state,
        products: {
          ...action.payload,
          products: list,
        },
      };
    }

    case GET_CART:
      return {
        ...state,
        cart: setCart(state.cart, action.payload),
      };

    case GET_CART_REQUEST:
      return {
        ...state,
        cart: startSyncing(state.cart),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: emptyCart(),
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: mergeCart(state.cart, action.payload),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: mergeCart(state.cart, action.payload),
      };

    case MERCADOPAGO:
      return {
        ...state,
        paymentStatus: "Pago completado",
      };

    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    case GET_TOTALSALES:
      return {
        ...state,
        totalSales: action.payload,
      };
    case GET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_PRODUCT:
      const updateProduct = action.payload; // Los nuevos datos del producto a actualizar
      const updateProducts = state.products.map((product) => {
        if (product.id === updateProduct.id) {
          // Reemplaza el producto que coincide con el ID
          return updateProduct;
        } else {
          return product;
        }
      });
      return {
        ...state,
        products: updateProducts,
      };
    case GET_USER_BY_NAME:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE_USER_STATE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
