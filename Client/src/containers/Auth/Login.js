import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }
  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    console.log(event.target.value);
  };
  handleShowHidePass = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    })
  }
  handleLogin = () => {
    console.log("Username", this.state.username);
    console.log("Password", this.state.password);
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>
                <i class="fas fa-user"></i>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>
                <i class="fas fa-key"></i>
              </label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnchangePassword(event)}
                />
                <span onClick={()=> this.handleShowHidePass()}>
                  <i className={this.state.isShowPassword ? "far fa-eye" : "fas fa-eye-slash"}></i>
                  </span>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-ps">Forget your password?</span>
            </div>
            <div className="col-12 text-center mt-5">
              <span className="text-other-login">Or Login With</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-facebook-square facebook"></i>
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-instagram instagram"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
