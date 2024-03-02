/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Signup.scss"; // Import SCSS file here
import { emitter } from "../../utils/emitter";
import { createNewUserServicer } from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";

class Signup extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
    };

    this.listenToEmiiter();
  }

  listenToEmiiter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        modal: false,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
        gender: "",
        roleId: "",
      });
    });
  }

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
      "gender",
      "roleId",
    ];

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error("Missing parameter: " + arrInput[i], {
          autoClose: 2000,
        });
        break;
      }
    }

    return isValid;
  };

  isValidEmail = (email) => {
    // Simple email validation, you may want to use a more robust validation library
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      toast.error("Invalid email format", {
        autoClose: 2000,
      });
    }

    return isValid;
  };

  createNewuser = async (data) => {
    try {
      let response = await createNewUserServicer(data);
      if (response && response.errCode !== 0) {
        toast.error(response.errMessage, {
          autoClose: 2000,
        });
      } else {
        await this.getAllUsersFromReact();
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });

        // Display success message using react-toastify with 2 seconds duration
        toast.success("User created successfully", {
          autoClose: 2000,
        });
      }
      console.log("response create user", response);
      this.props.userLoginSuccess(data.user);
    } catch (e) {
      console.log(e);
      // Display error message using react-toastify with 2 seconds duration
      toast.error("An error occurred while creating the user", {
        autoClose: 2000,
      });
    }
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidInput();

    if (isValid) {
      if (!this.isValidEmail(this.state.email)) {
        // Display error message using react-toastify with 2 seconds duration
        toast.error("Invalid email format", {
          autoClose: 2000,
        });
      } else {
        // Call API to create a new user
        this.createNewuser(this.state);
        this.setState({ modal: false });

        // Display success message using react-toastify with 2 seconds duration
        toast.success("User created successfully", {
          autoClose: 2000,
        });
      }
    } else {
      // Display error message using react-toastify with 2 seconds duration
      toast.error("Please fill in all required fields", {
        autoClose: 2000,
      });
    }
  };
  render() {
    const isHidden = this.state.roleId === "R3";
    return (
      <div className="user">
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options-registered">
              <h2 className="user_registered-title">Have an account?</h2>
              <p className="user_registered-text">
                Welcome to the dental hospital specializing in providing the top
                prestigious dental services in Viet Nam <br />
                <br />
                Log in to get online service consultation
              </p>
              <a
                className="user_registered-login"
                style={{ textDecoration: "none" }}
                type="button"
                href="login"
              >
                Login
              </a>
            </div>
          </div>
          <div className="user_options-forms" id="user_options-forms">
            <div className="user_forms-login">
              <h2 className="forms_title">Sign Up</h2>
              <div className="forms_form">
                <div className="forms_fieldset">
                  <div className="forms_field">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "firstName");
                      }}
                      value={this.state.firstName}
                      className="forms_field-input"
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "lastName");
                      }}
                      value={this.state.lastName}
                      className="forms_field-input"
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      type="email"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "email");
                      }}
                      value={this.state.email}
                      className="forms_field-input"
                      required
                      placeholder="Email"
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      name="password"
                      placeholder="password"
                      type="password"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "password");
                      }}
                      value={this.state.password}
                      className="forms_field-input"
                      autoComplete="on"
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      name="address"
                      placeholder="Address"
                      type="text"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "address");
                      }}
                      value={this.state.address}
                      className="forms_field-input"
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      name="phonenumber"
                      placeholder="Phone number"
                      type="text"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "phonenumber");
                      }}
                      value={this.state.phonenumber}
                      className="forms_field-input"
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <select
                      className="forms_field-input"
                      name="gender"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "gender");
                      }}
                      value={this.state.gender}
                    >
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                  </div>
                  <div
                    style={{ visibility: isHidden ? "hidden" : "visible" }}
                    className={`forms_field ${isHidden ? "hidden" : ""}`}
                  >
                    <select
                      className="forms_field-input"
                      name="roleId"
                      type="select"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "roleId");
                      }}
                      value="R3" // Always set the value to "3"
                    >
                      <option value="R3">Patient</option>
                      <option value="R2">Admin</option>
                      <option value="R1">Doctor</option>
                    </select>
                  </div>
                </div>
                <div className="forms_buttons">
                  <button
                    className="forms_buttons-action"
                    onClick={this.handleAddNewUser}
                  >
                    Sign up
                  </button>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
