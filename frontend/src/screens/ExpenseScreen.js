import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Expense from "../components/Expense";
import Message from "../components/Message";

import {
  particularMonthYearSalary,
  particularYearSalary,
  alltillNowSalary,
} from "../actions/miscellaneousActions";
import { ALL_SALARY_RESET } from "../constants/miscellaneousConstants";
const ExpenseScreen = () => {
  const componentRef = useRef();

  const dispatch = useDispatch();
  const [particularmonth, setParticularmonth] = useState(false);
  const [particularmonthofparticularyear, setParticularmonthofparticularyear] =
    useState(false);
  const allSalary = useSelector((state) => state.allSalary);
  const { loading, allsalary, error } = allSalary;
  const [month, setMonth] = useState("");
  const [all, setAll] = useState("");
  const [year, setYear] = useState("");
  const [particularyear, setParticularyear] = useState(false);
  const [show, setShow] = useState(false);
  const Year = () => {
    setParticularmonth(false);
    setParticularmonthofparticularyear(false);
    setParticularyear(true);
    dispatch({ type: ALL_SALARY_RESET });
  };
  const singleValue = (arr) => {
    var newarray = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log("value of the array is", arr);
    arr.map((data) => newarray.push(data.salaryAmount));
    console.log("value of the array is", newarray);
    return newarray.reduce(reducer);
  };
  const All = () => {
    dispatch({ type: ALL_SALARY_RESET });
    setParticularyear(false);
    setParticularmonthofparticularyear(false);
    setAll(true);
    dispatch(alltillNowSalary());
  };
  var i = 1;
  const print = () => {
    window.print();
    setShow(true);
  };
  const both = () => {
    dispatch({ type: ALL_SALARY_RESET });
    setParticularyear(false);
    setParticularmonth(false);
    setParticularmonthofparticularyear(true);
  };
  useEffect(() => {
    dispatch({ type: ALL_SALARY_RESET });
  }, [dispatch]);
  const formSubmit1 = async (e) => {
    e.preventDefault();
    dispatch({ type: ALL_SALARY_RESET });

    dispatch(particularMonthYearSalary(year, month));
  };
  const formSubmit2 = async (e) => {
    e.preventDefault();
    dispatch({ type: ALL_SALARY_RESET });

    dispatch(particularYearSalary(year));
  };
  return (
    <div className="container1">
      <style>{`@media print {    @page { size: 300mm 140.5mm;  }}`}</style>
      <h2 className="income-h1"> Expense statements</h2>
      <div className="income-button">
        <button onClick={All} className="link">
          All till Date
        </button>
        <button onClick={Year} className="link">
          Particular Year
        </button>
        <button onClick={both} className="link">
          Particular Month of Particular Year
        </button>
      </div>
      {particularmonthofparticularyear && (
        <div className="search-form">
          <form onSubmit={formSubmit1}>
            <input
              className="first-input"
              type="text"
              value={year}
              placeholder="Enter the year such as 2024"
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <select
              id="class"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required>
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            {/* {console.log(typeof data)} */}
            <button className="btn-search" type="submit">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Below is for particular year */}
      {particularyear && (
        <div className="search-form">
          <form onSubmit={formSubmit2}>
            <input
              className="first-input"
              type="text"
              value={year}
              placeholder="Enter the year such as 2024"
              onChange={(e) => setYear(e.target.value)}
              required
            />

            {/* {console.log(typeof data)} */}
            <button className="btn-search" type="submit">
              Search
            </button>
          </form>
        </div>
      )}

      {/* {console.log(error)} */}
      <div className="allincomedetails">
        {loading ? (
          <Loader />
        ) : allsalary ? (
          <div className="outerIncome">
            <div className="innerIncome">
              <p>SN</p>
              <p>Salary credited Date</p>
              <p>Particulars</p>
            </div>
            {allsalary.map((value) => (
              <div className="">
                <Expense
                  _id={value._id}
                  i={i++}
                  createdAt={value.createdAt}
                  salaryAmount={value.salaryAmount}
                  teacher_name={value.teacher_name}
                  staff_name={value.staff_name}
                  ref={componentRef}
                />
              </div>
            ))}
            <button onClick={print} className="printcmd">
              Print
            </button>
            {}
          </div>
        ) : (
          error && <Message variant="danger" message={error} />
        )}
        {allsalary && (
          <p style={{ background: "pink", margin: "20px 0", padding: "10px" }}>
            Total Salary paid in this period = Rs {singleValue(allsalary)}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseScreen;
