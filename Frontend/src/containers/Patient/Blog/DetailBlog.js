import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailBlog.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../Footer/footer";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllDetailBlogById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import FormEmail from "../../HomePage/Section/FormEmail";
import Customer from "../../HomePage/Section/Customer";

class DetailBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBlogId: [],
      dataDetailBlog: {},
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getAllDetailBlogById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrBlogId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrBlogId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailBlog: res.data,
          arrBlogId: arrBlogId,
        });
        console.log("duy check state dataDetailSpecialty", res.data);
      }
    }
  }

  getDataDetailSpecialty = () => {};

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrBlogId, dataDetailBlog } = this.state;
    let language = this.props;

    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailBlog && !_.isEmpty(dataDetailBlog) && (
              <>
                <div className="clinic-name">{dataDetailBlog.name}</div>
                <div> {dataDetailBlog.address}</div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailBlog.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>

          {arrBlogId &&
            arrBlogId.length > 0 &&
            arrBlogId.map((item, index) => {
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
        <FormEmail />
        <Customer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBlog);
