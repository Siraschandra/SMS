import axios from "axios";
import {
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_FAIL,
  STUDENT_CLASS_LIST_REQUEST,
  STUDENT_CLASS_LIST_SUCCESS,
  STUDENT_CLASS_LIST_FAIL,
  STUDENT_SEARCH_REQUEST,
  STUDENT_SEARCH_SUCCESS,
  STUDENT_SEARCH_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_DELETE_FAIL,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_REQUEST,
  STUDENT_FEES_REQUEST,
  STUDENT_FEES_SUCCESS,
  STUDENT_FEES_FAIL,
  DOMAIN_NAME,
} from "../constants/studentConstants";

//The below uses function within a function which is privileged by redux-thunk
export const listStudents = () => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_LIST_REQUEST,
    });
    const { data } = await axios.get(`${DOMAIN_NAME}/api/students`);
    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//The following function displays list of all students belonging to the particular class
export const classlistStudent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_CLASS_LIST_REQUEST,
    });
    const { data } = await axios.get(`${DOMAIN_NAME}/api/students/class/${id}`);
    dispatch({
      type: STUDENT_CLASS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_CLASS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//The following function is for searching the student for paying the fees
export const studentSearch = (name, classname, rollno) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_SEARCH_REQUEST,
    });
    console.log(name, classname, rollno);
    const { data } = await axios.get(
      `${DOMAIN_NAME}/api/students/search/${name}/${classname}/${rollno}`
    );
    console.log("Data is ", data);
    dispatch({
      type: STUDENT_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Student registration
export const Register =
  (
    student_name,
    classname,
    address,
    parents_name,
    contact_no,
    gender,
    age,
    email,
    registration_fees,
    image
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_REGISTER_REQUEST,
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
        `${DOMAIN_NAME}/api/students/register`,
        {
          student_name,
          classname,
          address,
          parents_name,
          contact_no,
          gender,
          age,
          email,
          registration_fees,
          image,
        },
        config
      );
      dispatch({
        type: STUDENT_REGISTER_SUCCESS,
        payload: data,
      });
      //Since we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: STUDENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//The following function is for deleting the student
export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_DELETE_REQUEST,
    });
    const { data } = await axios.delete(
      `${DOMAIN_NAME}/api/students/delete/${id}`
    );
    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Fees
export const PayFees =
  (
    studentId,
    student_name,
    classname,
    roll_no,
    month_name,
    year,
    monthly_fees,
    hostel_fees,
    laboratory_fees,
    computer_fees,
    exam_fees,
    miscellaneous
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_FEES_REQUEST,
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
        `${DOMAIN_NAME}/api/students/fees/${studentId}`,
        {
          student_name,
          classname,
          roll_no,
          month_name,
          year,
          monthly_fees,
          hostel_fees,
          laboratory_fees,
          computer_fees,
          exam_fees,
          miscellaneous,
        },
        config
      );
      dispatch({
        type: STUDENT_FEES_SUCCESS,
        payload: data,
      });
      //Since we are getting  the json data from our backend request so we need to convert it into the
      //string before we save them in our local storage of our  browser
    } catch (error) {
      dispatch({
        type: STUDENT_FEES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
