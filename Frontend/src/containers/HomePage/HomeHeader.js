import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguegeApp } from "../../store/actions";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: "",
      listDoctors: [],
      arrDoctor: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  changeLanguage = (language) => {
    this.props.changeLanguegeAppRedux(language);
  };

  handleChange = (doctor) => {
    this.setState({ doctor }, () =>
      console.log(`Option selected:`, this.state.doctor)
    );
    this.props.history.push(`/detail-doctor/${doctor.value}`);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  render() {
    let language = this.props.language;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div className="header-logo" onClick={this.returnToHome}></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.DentalSpecialist" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.SearchDoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <FormattedMessage id="homeheader.support" />
                <i className="fas fa-question-circle"></i>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                {" "}
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                {" "}
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="parent-container">
                <div className="search">
                  <i className="fas fa-search"></i>

                  <Select
                    className="search-doctor"
                    value={this.state.selectedOptions}
                    onChange={this.handleChange}
                    options={this.state.listDoctors}
                    placeholder={
                      <FormattedMessage id="patient.detail-doctor.search-doctor" />
                    }
                  />
                </div>
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    {" "}
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
              </div>

              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-stethoscope"></i>
                  </div>
                  <div className="text-child">
                    {" "}
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
              </div>
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-notes-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
              </div>
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="text-child">
                    {" "}
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    changeLanguegeAppRedux: (language) => dispatch(changeLanguegeApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
