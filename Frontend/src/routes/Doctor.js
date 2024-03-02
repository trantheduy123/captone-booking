import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";

import HomeHeader from "../../src/containers/HomePage/HomeHeader";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <HomeHeader />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/home" component={ManageSchedule} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
