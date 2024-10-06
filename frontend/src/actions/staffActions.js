import axios from "axios";
import {
  STAFF_DELETE_FAIL,
  STAFF_DELETE_REQUEST,
  STAFF_DELETE_SUCCESS,
  STAFF_LIST_FAIL,
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_REGISTER_FAIL,
  STAFF_REGISTER_REQUEST,
  STAFF_REGISTER_SUCCESS,
  STAFF_SALARY_FAIL,
  STAFF_SALARY_REQUEST,
  STAFF_SALARY_SUCCESS,
  DOMAIN_NAME,
} from "../constants/staffConstants";

export const PaySalary =
  (staffname, staffid, salaryForTheYear, salaryForTheMonth, salaryAmount) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STAFF_SALARY_REQUEST,
      });
      const {
        userLogin: { userCred },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCred.token}`,
        },
      };
      const { data } = await axios.post(
        `${DOMAIN_NAME}/api/STAFFs/fees/${staffname}/${staffid}`,
        {
          salaryForTheYear,
          salaryForTheMonth,
          salaryAmount,
        },
        config
      );
      dispatch({
        type: STAFF_SALARY_SUCCESS,
        payload: data,
      });
      //Since we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: STAFF_SALARY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//STAFF REGISTER
export const staffregister =
  (
    staff_name,
    qualification,
    address,
    contact_no,
    gender,
    previous_school,
    age,
    email,
    estimated_salary,
    image,
    work
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STAFF_REGISTER_REQUEST,
      });
      //We need to send headers information so we declaring it inside the config
      const {
        userLogin: { userCred },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCred.token}`,
        },
      };
      const { data } = await axios.post(
        `${DOMAIN_NAME}/api/staffs/register`,
        {
          staff_name,
          qualification,
          address,
          contact_no,
          gender,
          previous_school,
          age,
          email,
          estimated_salary,
          image,
          work,
        },
        config
      );
      dispatch({
        type: STAFF_REGISTER_SUCCESS,
        payload: data,
      });
      //Since we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: STAFF_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//Following is for deleting the staff
export const deleteStaff = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_DELETE_REQUEST,
    });
    const { data } = await axios.delete(
      `${DOMAIN_NAME}/api/staffs/delete/${id}`
    );
    dispatch({
      type: STAFF_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//All Staff
export const listStaffs = () => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_LIST_REQUEST,
    });
    const { data } = await axios.get(`${DOMAIN_NAME}/api/staffs`);
    dispatch({
      type: STAFF_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
