import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Customer.css";
import { FormattedMessage } from "react-intl";

const Customer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <>
      <section className="testimonial-container pb-5">
        <div className="container">
          <div className="section-title row">
            <h2>
              <FormattedMessage id="patient.testimonial.title-1" />
            </h2>
            <p>
              {" "}
              <FormattedMessage id="patient.testimonial.title-2" />
            </p>
          </div>
          <Slider {...settings}>
            <div className="testimonial">
              <div className="pic">
                <img
                  src="https://i.pinimg.com/564x/25/d6/f1/25d6f1cda46d5d9755712a6100201bbe.jpg"
                  alt=""
                />
              </div>
              <p className="description">
                <FormattedMessage id="patient.testimonial.title-3" />
              </p>
              <h3 className="title">
                Trần Minh Tuấn
                <span className="post"> - Developer</span>
              </h3>
            </div>
            <div className="testimonial">
              <div className="pic">
                <img
                  src="https://i.pinimg.com/736x/a5/33/4a/a5334a66367b02699629bd719502987c.jpg"
                  alt=""
                />
              </div>
              <p className="description">
                <FormattedMessage id="patient.testimonial.title-4" />
              </p>
              <h3 className="title">
                Nguyễn Văn Anh
                <span className="post"> - Teacher</span>
              </h3>
            </div>
            <div className="testimonial">
              <div className="pic">
                <img
                  src="https://i.pinimg.com/564x/1b/f9/5c/1bf95c8a818637eed27dcd4b2c6748ca.jpg"
                  alt=""
                />
              </div>
              <p className="description">
                <FormattedMessage id="patient.testimonial.title-5" />
              </p>
              <h3 className="title">
                Nguyễn Thị Hương
                <span className="post"> - Teacher</span>
              </h3>
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Customer;
