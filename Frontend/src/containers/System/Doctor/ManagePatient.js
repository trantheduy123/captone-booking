import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("days").valueOf(),
      dataPatient: [],
    };
  }

  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formateDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formateDate);
  }

  getDataPatient = async (user, formateDate) => {
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formateDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
    console.log(" tran the duy check res", res);
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handeOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formateDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formateDate);
      }
    );
  };
  handleBtnConfirm = () => {};
  handleBtnRemedy = () => {};

  render() {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log("tran duy", this.state);

    let { dataPatient } = this.state;
    return (
      <div className="manage-patient-container">
        <div className="m-p-title">quản lý bệnh nhân khám bệnh</div>
        <div className="manage-patient-body row">
          <div className="col-md-6 form-group">
            <label>Chọn ngày khám</label>
            <DatePicker
              className="form-control"
              onChange={this.handeOnchangeDatePicker}
              value={this.state.currentDate}
              minDate={yesterday}
            />
          </div>
          <div className="col-md-12 table-manage-patient">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ và tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Actions</th>
                </tr>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.timeTypeDataPatient.valueVi}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.patientData.genderData.valueVi}</td>
                        <td>
                          <button
                            className="mp-btn-confirm"
                            onClick={() => {
                              this.handleBtnConfirm();
                            }}
                          >
                            {" "}
                            Xác nhận{" "}
                          </button>
                          <button
                            className="mp-btn-remedy"
                            onClick={() => {
                              this.handleBtnRemedy();
                            }}
                          >
                            {" "}
                            Gửi Hóa Đơn{" "}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>no data</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
