/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../store/actions";
import "./Forgot.scss";
import { handleLoginApi, forgotUserPassword } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isShowPassword: false,
      errMessage: "",
      successMessage: "", // New state for success message
    };
  }

  handleOnChangeUserEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleLogin = async () => {
    const { email } = this.state;
    const response = await forgotUserPassword(email);

    if (response && response.err === 0) {
      this.setState({ successMessage: response.msg });
      toast.success(response.msg, {
        autoClose: 2000,
      });
    } else {
      this.setState({ errMessage: response.msg });
      toast.error(response.msg, {
        autoClose: 2000,
      });
    }
  };

  render() {
    const { successMessage } = this.state;

    return (
      <div className="login-blackground">
        <div className="login-container">
          <h2 className="user_registered-title">FORGOT PASSWORD</h2>
          <div className="login">
            {successMessage && (
              <div className="success-notification">{successMessage}</div>
            )}
            <input
              className="form-control"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={(event) => this.handleOnChangeUserEmail(event)}
            />
            <button
              className="btn-login"
              onClick={() => {
                this.handleLogin();
              }}
            >
              Send
            </button>
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
