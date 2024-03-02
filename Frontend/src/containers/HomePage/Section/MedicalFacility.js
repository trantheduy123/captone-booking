import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Co So Y Te Noi Bat</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="bg-image-text"> He thong 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="bg-image-text"> He thong 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="bg-image-text"> He thong 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="bg-image-text"> He thong 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="bg-image-text"> He thong 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="bg-image-text"> He thong 6</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
