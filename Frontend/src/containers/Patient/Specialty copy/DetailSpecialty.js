import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecial.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../Footer/footer";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE");

      if (res && res.errCode === 0 && resProvince.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;

        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
          console.log("duy check state dataProvince", dataProvince);
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
        console.log("duy check state dataDetailSpecialty", res.data);
      }
    }
  }

  getDataDetailSpecialty = () => {};

  handleOnChangeSelect = async (event) => {
    if (this.props.match && this.props.match && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
      console.log("duy check state dataDetailSpecialty", res.data);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let language = this.props;

    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="doctor-infor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        //dataTime={dataScheduleTimeModal}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    {" "}
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-infor">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.users,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAllUserRedux: (id) => dispatch(actions.deleteAllUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
