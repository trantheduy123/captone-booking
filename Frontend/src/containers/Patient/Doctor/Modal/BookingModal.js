import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import {
  postPatientBookAppoinment,
  registerNewUser,
} from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      genders: "",
      doctorId: "",
      timeType: "",
      selectedGender: "",
    };
  }

  async componentDidMount() {
    this.props.getGender();
  }

  handleConfirmBooking = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.state.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate other fields for spaces
    if (
      this.state.fullName.trim() === "" ||
      this.state.phoneNumber.trim() === "" ||
      this.state.address.trim() === "" ||
      this.state.reason.trim() === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
    let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal);
    let res = await postPatientBookAppoinment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    console.log("res", res);
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed");
      this.props.closeBookingClose();
    } else {
      toast.error("Booking a new appointment error");
    }
  };

  buildTimeBooking = (dataScheduleTimeModal) => {
    let { language } = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      console.log("data time check", dataScheduleTimeModal);

      let time =
        language === LANGUAGES.VI
          ? dataScheduleTimeModal.timeTypeData.valueVi
          : dataScheduleTimeModal.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataScheduleTimeModal.date / 1000)
              .format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataScheduleTimeModal.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      return `${time} - ${date}`;
    }
    console.log("data time check", dataScheduleTimeModal);
    return null;
  };

  buildDoctorName = (dataScheduleTimeModal) => {
    let { language } = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      console.log(
        "data time check name dataScheduleTimeModal",
        dataScheduleTimeModal
      );
      let name =
        language === LANGUAGES.VI
          ? `${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName}`
          : `${dataScheduleTimeModal.doctorData.firstName} ${dataScheduleTimeModal.doctorData.lastName}`;

      return name;
    }
    console.log("data time check name", dataScheduleTimeModal);
    return null;
  };

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      if (
        this.props.dataScheduleTimeModal &&
        !_.isEmpty(this.props.dataScheduleTimeModal)
      ) {
        let doctorId = this.props.dataScheduleTimeModal.doctorId;
        let timeType = this.props.dataScheduleTimeModal.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handeOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  render() {
    let { isOpenModal, closeBookingClose, dataScheduleTimeModal } = this.props;
    let doctorId = "";
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      doctorId = dataScheduleTimeModal.doctorId;
    }

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        centered
        size="lg"
        // backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right">
              <i class="fas fa-times" onClick={closeBookingClose}></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataScheduleTimeModal}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>

            <div className="row">
              <div className="col-md-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullname" />
                </label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "fullName")
                  }
                />
              </div>
              <div className="col-md-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="patient.booking-modal.phonenumber" />
                </label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Dia chi Email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeInput(event, "email")}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-md-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "reason")
                  }
                />
              </div>
              <div className="col-md-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handeOnchangeDatePicker}
                  value={this.state.birthday}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingClose}>
              <FormattedMessage id="patient.booking-modal.btnCancle" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
