import axios from "axios";
import {
  TEACHER_DELETE_FAIL,
  TEACHER_DELETE_REQUEST,
  TEACHER_DELETE_SUCCESS,
  TEACHER_LIST_FAIL,
  TEACHER_LIST_REQUEST,
  TEACHER_LIST_SUCCESS,
  TEACHER_REGISTER_FAIL,
  TEACHER_REGISTER_REQUEST,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_SALARY_FAIL,
  TEACHER_SALARY_REQUEST,
  TEACHER_SALARY_SUCCESS,
  DOMAIN_NAME,
} from "../constants/teacherConstants";

export const PaySalary =
  (teachername, teacherid, salaryForTheYear, salaryForTheMonth, salaryAmount) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_SALARY_REQUEST,
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
        `${DOMAIN_NAME}/api/teachers/fees/${teachername}/${teacherid}`,
        {
          salaryForTheYear,
          salaryForTheMonth,
          salaryAmount,
        },
        config
      );
      dispatch({
        type: TEACHER_SALARY_SUCCESS,
        payload: data,
      });
      //Since we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: TEACHER_SALARY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//Teacher Registration
export const teacherregister =
  (
    teacher_name,
    qualification,
    address,
    contact_no,
    gender,
    previous_school,
    age,
    email,
    estimated_salary,
    image,
    subjectToTeach
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_REGISTER_REQUEST,
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
        `${DOMAIN_NAME}/api/teachers/register`,
        {
          teacher_name,
          qualification,
          address,
          contact_no,
          gender,
          previous_school,
          age,
          email,
          estimated_salary,
          image,
          subjectToTeach,
        },
        config
      );
      dispatch({
        type: TEACHER_REGISTER_SUCCESS,
        payload: data,
      });
      //Since we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: TEACHER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//The following function is for deleting the teacher
export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_DELETE_REQUEST,
    });
    const { data } = await axios.delete(
      `${DOMAIN_NAME}/api/teachers/delete/${id}`
    );
    dispatch({
      type: TEACHER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//All Teachers
export const listTeachers = () => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_LIST_REQUEST,
    });
    const { data } = await axios.get(`${DOMAIN_NAME}/api/teachers`);
    dispatch({
      type: TEACHER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
