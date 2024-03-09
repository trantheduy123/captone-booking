import React, { Component } from "react";
import { connect } from "react-redux";
import "./MoreDoctor.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../Footer/footer";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import ProfileDoctor from "./ProfileDoctor";
import {
  getAllDetailClinicById,
  getAllCodeService,
  getAllClinic,
  getAllDoctors,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import OutStandingDoctor from "../../HomePage/Section/OutStandingDoctor";
import MedicalFacility from "../../HomePage/Section/MedicalFacility";
import FormEmail from "../../HomePage/Section/FormEmail";
import Customer from "../../HomePage/Section/Customer";

class MoreDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMoreDoctor: {},
      listDoctor: [],
      selectDoctor: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctor();
    /*  this.props.getRequiredDoctorInfor(); */
    try {
      const res = await getAllDoctors();
      if (res && res.errCode === 0) {
        const { data } = res;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.arrDoctorId;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataMoreDoctor: data,
          arrDoctorId: arrDoctorId,
        });
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  }

  getDataDetailSpecialty = () => {};

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        /* let labelVi = `${item.name} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn; */
        object.label = item.name;
        object.value = item.id;
        result.push(object);
      });
      console.log("result", result);
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
  }

  handleChange = (selectDoctor) => {
    this.setState({ selectDoctor }, () =>
      console.log(`Option selected:`, this.state.doctor)
    );
    this.props.history.push(`/detail-doctor/${selectDoctor.value}`);
  };

  render() {
    let { arrDoctorId, dataMoreDoctor } = this.state;
    let language = this.props;

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
      ],
    };
    return (
      <>
        <HomeHeader />

        <div className="detail-specialty-container">
          <div className="parent-container">
            <div class="nm2-text-component nm2-margin-bottom-md">
              <h3>
                {" "}
                <FormattedMessage id="patient.slider-about.title-8" />
              </h3>
              <p>
                <FormattedMessage id="patient.slider-about.title-2" />
              </p>
            </div>
            <OutStandingDoctor settings={settings} />
            <div className="search">
              <i className="fas fa-search"></i>

              <Select
                className="search-doctor"
                value={this.state.selectDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctor}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                }
              />
            </div>
          </div>

          <div className="detail-specialty-body">
            {dataMoreDoctor && dataMoreDoctor.length > 0 ? (
              dataMoreDoctor.map((doctor, index) => (
                <div className="description-specialty" key={index}>
                  <div className="doctor-name">
                    {" "}
                    <FormattedMessage id="patient.booking-modal.fullname" />
                    {doctor.firstName}
                  </div>
                  <div className="doctor-phone">
                    <FormattedMessage id="patient.booking-modal.phonenumber" />
                    {doctor.phonenumber}
                  </div>
                  <div className="doctor-email">
                    {" "}
                    <FormattedMessage id="patient.booking-modal.email" />
                    {doctor.email}
                  </div>
                  <div className="doctor-address">
                    {" "}
                    <FormattedMessage id="patient.booking-modal.address" />
                    {doctor.address}
                  </div>

                  {doctor.image && (
                    <img
                      className="doctor-img"
                      src={doctor.image}
                      alt={doctor.name}
                    />
                  )}
                  <Link
                    className="link-to-dentail-doctor"
                    to={`/detail-doctor/${doctor.id}`}
                  >
                    <FormattedMessage id="homepage.more-info" />
                  </Link>
                  {/* Render doctor details for each doctor */}
                  {arrDoctorId &&
                    arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => (
                      <div className="each-doctor" key={index}>
                        <div className="dt-content-left">
                          <div className="doctor-infor">
                            <ProfileDoctor
                              doctorId={item}
                              isShowDescriptionDoctor={true}
                              isShowLinkDetail={true}
                              isShowPrice={false}
                            />
                          </div>
                        </div>
                        <div className="dt-content-right">
                          <div className="doctor-schedule">
                            <DoctorSchedule doctorIdFromParent={item} />
                          </div>
                          <div className="doctor-extra-infor">
                            <DoctorExtraInfor doctorIdFromParent={item} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <div>No clinics found</div>
            )}
          </div>
        </div>
        <FormEmail />
        <Customer />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.users,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAllUserRedux: (id) => dispatch(actions.deleteAllUser(id)),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreDoctor);
