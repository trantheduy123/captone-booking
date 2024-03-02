/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { apiResetPassword } from "../../services/userService";
import { withRouter } from "react-router-dom"; // Import withRouter

class ResetPassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmpassword: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleOnChangeConfirmPassword = (event) => {
    this.setState({
      confirmpassword: event.target.value,
    });
  };

  handleReset = async () => {
    const { match } = this.props;
    const { token } = match.params;
    const { password, confirmpassword } = this.state;

    if (password !== confirmpassword) {
      this.setState({
        errMessage: "Passwords do not match.",
      });
      return;
    }
    const finalPayload = { password, token };
    const response = await apiResetPassword(finalPayload);
    if (response?.data?.err === 1) {
      alert("Sự cố!", response?.data?.msg, "error");
    } else {
      this.props.userLoginSuccess(response?.data?.user);
      alert("Thành công", response?.data?.msg, "success");
    }
  };

  handleShowhidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div className="login-blackground">
        <div className="login-container">
          <div className="login-content">
            <h2 className="user_registered-title">CREATE PASSWORD</h2>
            <div className="col-12 form-group login-input">
              <label className="mb-2">New password:</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  color: "crimson",
                }}
                className="custom-input-password"
              >
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span onClick={() => this.handleShowhidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 form-group login-input">
              <label className="mb-2">Confirm your new password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.confirmpassword}
                  onChange={(event) =>
                    this.handleOnChangeConfirmPassword(event)
                  }
                />
              </div>
            </div>
            <div className="col-12 " style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleReset();
                }}
              >
                Change your password
              </button>
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
    /* userLoginFail: () => dispatch(actions.userLoginFail()), */
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassWord));
