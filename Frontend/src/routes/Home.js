import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { processLogout } from "../store/actions";
import { USER_ROLE } from "../utils";
import { adminMenu, doctorMenu } from "../containers/Header/menuApp";
import _ from "lodash";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      redirectTo: null,
    };
  }
  componentDidMount() {
    const { isLoggedIn, processLogout, userInfo } = this.props;

    // Check if the user is logged in before attempting logout
    if (!isLoggedIn) {
      this.setState({ redirectTo: "/login" });
      return; // Exit the method early if the user is not logged in
    }

    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }

    // Clear session and local storage
    /*  processLogout();
    localStorage.clear();
 */
    this.setState({
      redirectTo: "/home",
      menuApp: menu,
    });
  }
  render() {
    const { isLoggedIn } = this.props;
    let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
