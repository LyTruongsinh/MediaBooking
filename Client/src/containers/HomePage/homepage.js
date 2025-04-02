import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HeaderHome from "./HeaderHome.js";
import Specialty from "./Section/Specialty.js";
class HomePage extends Component {
  render() {
    return (
      <div>
        <HeaderHome />
        <Specialty />
        <div style={{height: '300px'}}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
