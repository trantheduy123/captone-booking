import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Customer.css"; // Import your CSS file here
import { FormattedMessage } from "react-intl";

const SliderAbout = () => {
  return (
    <>
      <div class="about-container container-fluid">
        <div class="container">
          <div class="row">
            <div class="col-md-6 aboutlefft">
              <h2>
                <FormattedMessage id="patient.slider-about.title-1" />
              </h2>
              <p>
                <FormattedMessage id="patient.slider-about.title-2" />
              </p>
              <ul>
                <li>
                  <i class="fa fa-check"></i>{" "}
                  <FormattedMessage id="patient.slider-about.title-3" />
                </li>
                <li>
                  <i class="fa fa-check"></i>{" "}
                  <FormattedMessage id="patient.slider-about.title-4" />
                </li>
                <li>
                  <i class="fa fa-check"></i>{" "}
                  <FormattedMessage id="patient.slider-about.title-5" />
                </li>
                <li>
                  <i class="fa fa-check"></i>{" "}
                  <FormattedMessage id="patient.slider-about.title-6" />
                </li>
                <li>
                  <i class="fa fa-check"></i>{" "}
                  <FormattedMessage id="patient.slider-about.title-7" />
                </li>
              </ul>
            </div>
            <div class="col-md-6 imgright">
              <img
                src="https://i.pinimg.com/564x/23/5e/2b/235e2b08f426017df1ed0ee8aa453578.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderAbout;
