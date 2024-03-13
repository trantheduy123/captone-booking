import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
//import Login from '../routes/Login';
import Login from "./Auth/Login";
import FacebookCallback from "./Auth/FbLogin";

import Header from "./Header/Header";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";

import { CustomToastCloseButton } from "../components/CustomToast";
import Forgot from "./Auth/Forgot";
import ResetPassWord from "./Auth/ResetPassWord";
import Signup from "./Auth/Signup";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import VerifyEmail from "./Patient/VerifyEmail";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import MoreDetailClinic from "./Patient/Clinic/MoreDetailClinic";
import MoreBlogClinic from "./Patient/Blog/MoreBlogClinic";
import MoreDoctor from "./Patient/Doctor/MoreDoctor";
import MoreSpecialty from "./Patient/Specialty/MoreSpecialty";
import DetailBlog from "./Patient/Blog/DetailBlog";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.FORGOT}
                    component={userIsNotAuthenticated(Forgot)}
                  />
                  <Route
                    path={path.SIGNUP}
                    component={userIsNotAuthenticated(Signup)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/doctor"}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={"/auth/facebook"} component={FacebookCallback} />
                  <Route
                    path={"/resetpassword/:token"}
                    component={ResetPassWord}
                  />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.DETAIL_DOCTOR_MORE}
                    component={MoreDoctor}
                  />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route
                    path={path.DETAIL_CLINIC_MORE}
                    component={MoreDetailClinic}
                  />
                  MoreSpecialty
                  <Route
                    path={path.DETAIL_BLOG_MORE}
                    component={MoreBlogClinic}
                  />
                  <Route
                    path={path.DETAIL_SPECIALTY_MORE}
                    component={MoreSpecialty}
                  />
                  <Route path={path.DETAIL_BLOG} component={DetailBlog} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {/* Same as */}
            <ToastContainer />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
