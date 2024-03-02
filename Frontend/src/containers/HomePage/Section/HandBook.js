import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm Nang</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="section-handbook bg-image" />
                <div className="bg-image-text"> Nieng Rang 1</div>
              </div>
              <div className="section-customize">
                <div className="section-handbook bg-image" />
                <div className="bg-image-text"> Nieng Rang 2</div>
              </div>
              <div className="section-customize">
                <div className="section-handbook bg-image" />
                <div className="bg-image-text"> Nieng Rang 3</div>
              </div>
              <div className="section-customize">
                <div className="section-handbook bg-image" />
                <div className="bg-image-text"> Nieng Rang 4</div>
              </div>
              <div className="section-customize">
                <div className="section-handbook bg-image" />
                <div className="bg-image-text"> Nieng Rang 5</div>
              </div>
              <div className="section-customize">
                <div className="section-handbook bg-image" />
                <div className="bg-image-text"> Nieng Rang 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
