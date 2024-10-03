import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    //We need to send headers information so we declaring it inside the config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://sms-deploy-backend.onrender.com/api/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    //Since we are getting  the json data from our backend request so we need to convert it into the
    //string before we save them in our local storage of our  browser
    localStorage.setItem("userCred", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//This function is for logging out user
export const logout = () => (dispatch) => {
  localStorage.removeItem("userCred");
  dispatch({
    type: USER_LOGOUT,
  });
};
