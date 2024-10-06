import React, { Component } from "react";
import FormatDate from "./FormatDate";

export default class Expense extends Component {
  render() {
    var i = 0;
    return (
      <div className="innerIncome">
        <p>{this.props.i}</p>
        <p>{FormatDate(this.props.createdAt)}</p>
        <p>
          Total Salary paid Rs {this.props.salaryAmount} to{" "}
          {this.props.teacher_name
            ? this.props.teacher_name
            : this.props.staff_name}
        </p>
      </div>
    );
  }
}
