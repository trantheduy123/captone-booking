import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import { getAllBlog } from "../../../services/userService";
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
    try {
      const res = await getAllBlog();
      if (res && res.errCode === 0) {
        this.setState({
          dataBlogs: res.data || [],
        });
      }
      console.log("tran the duy check", res);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  handleViewDetailBlog = (blog) => {
    return () => {
      if (this.props.history) {
        this.props.history.push(`/detail-blog/${blog.id}`);
      }
    };
  };

  handleViewDetailBlogMore = () => {
    if (this.props.history) {
      this.props.history.push("/detail-blog-more");
    }
  };

  render() {
    const { dataBlogs } = this.state;
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="patient.slider-about.title-10" />
            </span>
            <button
              className="btn-section"
              onClick={this.handleViewDetailBlogMore}
            >
              <FormattedMessage id="patient.slider-about.title-9" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataBlogs.map((item, index) => (
                <div
                  className="section-customize clinic-child"
                  key={index}
                  onClick={this.handleViewDetailBlog(item)}
                >
                  <div
                    className="bg-image section-medical-facility"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="clinic-name">{item.name}</div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
