import axios from "axios";
import { setAlert } from "./alertAction";
import setAuthToken from "../utils/setAuthToken";
import * as types from "./types";

// Get Users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/");
    dispatch({
      type: types.GET_USERS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  dispatch(getUsers());

  try {
    const res = await axios.get("/api/user/me");
    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

// Add User
export const addUser = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/signup", formData);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors && errors.error.code === 11000) {
      dispatch(setAlert("User Already Exists!", "danger"));
    } else if (errors) {
      dispatch(setAlert(errors.message, "danger"));
    }

    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};

// Add second User

export const addSecondUser = (formData, history) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await axios.post("/api/user/signupUser", formData);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("User Created Successfully", "success"));
  } catch (err) {
    alert("something went wrong");

    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};

// Update me
export const updateMe = (photoData, history) => async (dispatch) => {
  try {
    const res = await axios.patch("/api/user/updateMe", photoData);

    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });

    dispatch(setAlert("Profile Updated!", "success"));
    dispatch(loadUser());

    // history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/user/login", body, config);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    if (err) {
      dispatch(setAlert("Invalid username or password", "danger"));
    }

    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

// Update My Password
export const updateMyPassword = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.patch("/api/user/updateMyPassword", formData);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Password Updated!", "success"));
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors.message, "danger"));
    }

    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  if (window.confirm("Confirm Logout?")) {
    dispatch({ type: types.CLEAR_USER });
    dispatch({ type: types.LOGOUT });
  }
};
