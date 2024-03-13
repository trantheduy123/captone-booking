import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import "./FormEmail.css";
import { toast } from "react-toastify";
import { postSendEmail } from "../../../services/userService";

class FormEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isShowLoading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  sendEmail = async () => {
    const { email } = this.state;
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    this.setState({
      isShowLoading: true,
    });
    try {
      const res = await postSendEmail({
        email: email,
      });

      if (res && res.errCode === 0) {
        toast.success("Send Remedy succeeds");
        this.closeRemedyModal();
      } else {
        toast.error("Send Remedy failed");
      }
    } catch (error) {
      console.error("Error sending remedy:", error);
      toast.error("An error occurred while sending remedy");
    } finally {
      this.setState({
        isShowLoading: false,
      });
    }
  };

  closeRemedyModal = () => {
    // Define your logic to close the modal here
  };

  render() {
    const { isShowLoading } = this.state;
    return (
      <div className="nm2-bg-light nm2-radius-md nm2-inner-glow nm2-shadow-sm nm2-padding-md nm2-text-center">
        <div className="nm2-max-width-xs nm2-margin-x-auto">
          <div className="nm2-margin-bottom-xs">
            <svg
              class="nm2-icon nm2-icon--xl"
              viewBox="0 0 64 64"
              aria-hidden="true"
            >
              <path
                d="M54.053,33.3l-21-13a2,2,0,0,0-2.106,0l-21,13A2,2,0,0,0,9,35V58a2,2,0,0,0,2,2H53a2,2,0,0,0,2-2V35A2,2,0,0,0,54.053,33.3Z"
                fill="#212121"
              />
              <path
                d="M47,51H17V16a2,2,0,0,1,2-2H45a2,2,0,0,1,2,2Z"
                fill="#e3e3e3"
              />
              <path
                d="M40,23H24a1,1,0,0,1,0-2H40a1,1,0,0,1,0,2Z"
                fill="#aeaeae"
              />
              <path
                d="M40,30H24a1,1,0,0,1,0-2H40a1,1,0,0,1,0,2Z"
                fill="#aeaeae"
              />
              <path
                d="M33,37H24a1,1,0,0,1,0-2h9a1,1,0,0,1,0,2Z"
                fill="#aeaeae"
              />
              <path
                d="M55,35,32,45.867,9,35V58c0,.015,0,.029,0,.044a1.927,1.927,0,0,0,.027.26c.006.04.008.081.016.12l0,.016c0,.006.006.009.008.014A2,2,0,0,0,11,60H53a2,2,0,0,0,1.951-1.56A1.916,1.916,0,0,0,55,58.022c0-.008.006-.013.006-.022Z"
                fill="#949494"
              />
              <path
                d="M13,7.029a3,3,0,0,1-3-3,1,1,0,0,0-2,0,3,3,0,0,1-3,3,1,1,0,0,0,0,2,3,3,0,0,1,3,3,1,1,0,0,0,2,0,3,3,0,0,1,3-3,1,1,0,0,0,0-2Z"
                fill="#ffd764"
              />
              <circle cx="55" cy="14" r="3" fill="#ff7163" />
            </svg>
          </div>

          <div className="nm2-text-component nm2-margin-bottom-md">
            <h3>
              {" "}
              <FormattedMessage id="patient.slider-about.title-12" />{" "}
            </h3>
            <p>
              <FormattedMessage id="patient.slider-about.title-11" />
            </p>
          </div>

          <div className="nm2-grid nm2-gap-2xs">
            <input
              className="nm2-form-control"
              aria-label="Email"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <button
              onClick={this.sendEmail}
              className="nm2-btn nm2-btn--primary"
              disabled={isShowLoading}
            >
              {isShowLoading ? "Loading..." : "Subscribe"}
            </button>
          </div>

          <p
            className={`nm2-text-sm ${
              isShowLoading ? "nm2-bg-success nm2-bg-opacity-20%" : ""
            } nm2-padding-xs nm2-radius-md nm2-margin-top-xs`}
            role="alert"
          >
            <strong>✔ Success!</strong> Welcome aboard, friend!
          </p>

          <div className="nm2-margin-top-sm">
            <p className="nm2-color-contrast-medium nm2-text-sm">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.user.language, // Assuming you have language state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormEmail);
