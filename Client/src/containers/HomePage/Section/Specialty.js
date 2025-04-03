import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";

import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Specialty extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="sepicalty-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>

          <div className="specialty-body">
            <Slider {...settings}>
              <div className="specialty-customize">
                <div className="specialty-body">
                  <div className="bg-image" />
                  <div className="name-spacialty">Khoa Xương Khớp</div>
                </div>
              </div>
              <div className="specialty-customize">
                <div className="specialty-body">
                  <div className="bg-image" />
                  <div className="name-spacialty">Khoa Xương Khớp</div>
                </div>
              </div>
              <div className="specialty-customize">
                <div className="specialty-body">
                  <div className="bg-image" />
                  <div className="name-spacialty">Khoa Xương Khớp</div>
                </div>
              </div>
              <div className="specialty-customize">
                <div className="specialty-body">
                  <div className="bg-image" />
                  <div className="name-spacialty">Khoa Xương Khớp</div>
                </div>
              </div>
              <div className="specialty-customize">
                <div className="specialty-body">
                  <div className="bg-image" />
                  <div className="name-spacialty">Khoa Xương Khớp</div>
                </div>
              </div>
              <div className="specialty-customize">
                <div className="specialty-body">
                  <div className="bg-image" />
                  <div className="name-spacialty">Khoa Xương Khớp</div>
                </div>
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
