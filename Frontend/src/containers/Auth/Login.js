/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { toast } from "react-toastify";

import { handleLoginApi } from "../../services/userService";
import { USER_ROLE } from "../../utils";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);

      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });

        // Display error message using react-toastify with 2 seconds duration
        toast.error(data.message, {
          autoClose: 2000,
        });
      }

      if (data && data.errCode === 0) {
        // Display success message using react-toastify with 2 seconds duration
        toast.success("Login successful!", {
          autoClose: 2000,
        });

        this.props.userLoginSuccess(data.user);

        // Redirect user with role R3 to "/home"
        if (data.user && data.user.roleId === USER_ROLE.PATIENT) {
          this.props.navigate("/home");
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });

          // Display error message using react-toastify with 2 seconds duration
          toast.error(error.response.data.message, {
            autoClose: 2000,
          });
        }
      }
    }
  };

  handleShowhidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div className="user">
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options-unregistered">
              <h2 className="user_unregistered-title">
                Don't have an account?
              </h2>
              <p className="user_unregistered-text">
                Welcome to booking dental clinic specializing in providing.
                <br />
                dental services Register an account to book an online medical
                examination.
              </p>
              <a
                style={{ textDecoration: "none" }}
                className="user_unregistered-signup"
                type="button"
                href="signup"
              >
                Sign up
              </a>
            </div>
          </div>

          <div className="user_options-forms" id="user_options-forms">
            <div className="user_forms-login">
              <h2 className="forms_title">Login</h2>
              <div className="forms_form">
                <div className="forms_fieldset">
                  <div className="forms_field">
                    <input
                      type="email"
                      placeholder="Email"
                      className="forms_field-input"
                      value={this.state.username}
                      onChange={(event) => this.handleOnChangeUserName(event)}
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      type="password"
                      placeholder="Password"
                      className="forms_field-input"
                      value={this.state.password}
                      onChange={(event) => this.handleOnChangePassword(event)}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="forms_buttons">
                  <a
                    type="button"
                    href="forgot"
                    className="forms_buttons-forgot"
                  >
                    Forgot password?
                  </a>
                  <button
                    className="forms_buttons-action"
                    onClick={this.handleLogin}
                  >
                    Login
                  </button>
                </div>
                <div className="col-12 text-center mt-3">
                  <span className="text-other-login">Or login with:</span>
                </div>

                <a
                  className="fab fa-facebook facebook-link"
                  href="https://www.facebook.com/v18.0/dialog/oauth?client_id=1096141791421266&redirect_uri=http://localhost:3000/auth/facebook&scope=email"
                ></a>
              </div>
            </div>
          </div>
        </div>

        {/* React Toastify Container */}
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
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
