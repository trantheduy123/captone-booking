import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import "./footer.css";
import { withRouter } from "react-router";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./footer.css";

class Footer extends Component {
  handleViewDetailSpecialtyMore = () => {
    if (this.props.history) {
      this.props.history.push("/detail-specialty-more");
    }
  };

  handleViewDetailDoctorMore = () => {
    if (this.props.history) {
      this.props.history.push("/detail-doctor-more");
    }
  };
  handleViewDetailClinicMore = () => {
    if (this.props.history) {
      this.props.history.push("/detail-clinic-more");
    }
  };

  handleViewDetailBlogMore = () => {
    if (this.props.history) {
      this.props.history.push("/detail-blog-more");
    }
  };
  render() {
    return (
      <>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <h2>
                  <FormattedMessage id="footer.about" />
                </h2>
                <p>
                  <FormattedMessage id="footer.title1" />
                </p>
                <p>
                  <FormattedMessage id="footer.title2" />
                </p>
              </div>
              <div className="col-md-4 col-sm-12">
                <ul className="list-unstyled link-list">
                  <h2>
                    <FormattedMessage id="footer.info" />
                  </h2>
                  <li onClick={this.handleViewDetailSpecialtyMore}>
                    <div ui-sref="about" href="#/">
                      <FormattedMessage id="homeheader.DentalSpecialist" />
                    </div>
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li onClick={this.handleViewDetailClinicMore}>
                    <a ui-sref="portfolio" href="#/">
                      <FormattedMessage id="homeheader.health-facility" />
                    </a>
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li onClick={this.handleViewDetailDoctorMore}>
                    <a ui-sref="products" href="#/">
                      <FormattedMessage id="homeheader.doctor" />
                    </a>
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li onClick={this.handleViewDetailBlogMore}>
                    <a ui-sref="gallery" href="#/">
                      <FormattedMessage id="homeheader.fee" />
                    </a>
                    <i className="fa fa-angle-right"></i>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-sm-12 map-img">
                <h2>
                  <FormattedMessage id="footer.contact" />
                </h2>
                <div className="address md-margin-bottom-40">
                  Quận 3, <br />
                  phường 10 <br />
                  TP Hồ Chí Minh, Việt Nam <br />
                  Phone: +84 0987654321 <br />
                  Email:{" "}
                  <a href="mailto:info@bluedart.com" className="">
                    trantheduy2309@gmail.com
                  </a>
                  <br />
                  Web:
                  <a href="#" className="">
                    www.bookingclinic.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copy">
          <div className="container">
            <a href="https://www.smarteyeapps.com/">
              2024 &copy; All Rights Reserved | Designed and Developed by Tran
              The Duy
            </a>

            <span>
              <a>
                <i className="fab fa-github"></i>
              </a>
              <a>
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a>
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a>
                <i className="fab fa-twitter"></i>
              </a>
              <a>
                <i className="fab fa-facebook-f"></i>
              </a>
            </span>
          </div>
        </div>
      </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
