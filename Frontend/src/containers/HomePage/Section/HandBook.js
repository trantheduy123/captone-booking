import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import { getAllBlog } from "../../../services/userService";
import { withRouter } from "react-router";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBlogs: [],
    };
  }

  async componentDidMount() {
    let res = await getAllBlog();
    if (res && res.errCode === 0) {
      this.setState({
        dataBlogs: res.data ? res.data : [],
      });
    }
    console.log("tran the duy check", res);
  }

  handleViewDetailBlog = (blog) => {
    if (this.props.history) {
      this.props.history.push(`/detail-blog/${blog.id}`);
    }
  };

  render() {
    let { dataBlogs } = this.state;
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="patient.slider-about.title-8" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="patient.slider-about.title-9" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataBlogs &&
                dataBlogs.length > 0 &&
                dataBlogs.map((item, index) => {
                  return (
                    <div
                      className="section-customize clinic-child"
                      key={index}
                      onClick={() => this.handleViewDetailBlog(item)}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="clinic-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
