import React, { Component } from "react";
import { connect } from "react-redux";
import "./MoreBlogClinic.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../Footer/footer";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllBlog,
  getAllDetailBlogById,
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
import HandBook from "../../HomePage/Section/HandBook";

class MoreBlogClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMoreBlogClinic: {},
      listBlog: [],
      selectBlog: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllBlogs();
    /*  this.props.getRequiredDoctorInfor(); */
    try {
      const res = await getAllBlog();
      if (res && res.errCode === 0) {
        const { data } = res;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataMoreBlogClinic: data,
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
    if (prevProps.allBlogs !== this.props.allBlogs) {
      let dataSelect = this.buildDataInputSelect(this.props.allBlogs);
      this.setState({
        listBlog: dataSelect,
      });
    }
  }

  handleChange = (selectBlog) => {
    this.setState({ selectBlog }, () =>
      console.log(`Option selected:`, this.state.blog)
    );
    this.props.history.push(`/detail-blog/${selectBlog.value}`);
  };

  render() {
    let { arrDoctorId, dataMoreBlogClinic } = this.state;
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
                <FormattedMessage id="patient.slider-about.title-10" />
              </h3>
              <p>
                <FormattedMessage id="patient.slider-about.title-2" />
              </p>
            </div>
            <HandBook settings={settings} />
            <div className="search">
              <i className="fas fa-search"></i>

              <Select
                className="search-doctor"
                value={this.state.selectBlog}
                onChange={this.handleChange}
                options={this.state.listBlog}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-blog" />
                }
              />
            </div>
          </div>

          <div className="detail-specialty-body">
            {dataMoreBlogClinic && dataMoreBlogClinic.length > 0 ? (
              dataMoreBlogClinic.map((blog, index) => (
                <div className="description-specialty" key={index}>
                  <div className="blog-name">{blog.name}</div>
                  <div className="blog-address">{blog.address}</div>

                  {blog.image && (
                    <img
                      className="blog-img"
                      src={blog.image}
                      alt={blog.name}
                    />
                  )}
                  <Link
                    className="link-to-dentail-blog"
                    to={`/detail-blog/${blog.id}`}
                  >
                    <FormattedMessage id="homepage.more-info" />
                  </Link>
                  {/* Render doctor details for each blog */}
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
    allBlogs: state.admin.allBlogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBlogs: () => dispatch(actions.fetchAllBlogs()),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAllUserRedux: (id) => dispatch(actions.deleteAllUser(id)),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreBlogClinic);
