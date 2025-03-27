import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HeaderHome.scss";
class HeaderHome extends Component {
  render() {
    return (
      <div className="home_header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fas fa-bars"></i>
            <div className="header-logo"></div>
          </div>
          <div className="center-content">
            <div className="child-content">
              <div className="">
                <b>Chuyên khoa</b>
              </div>
              <div className="sub-titles">Tìm bác sĩ theo chuyên khoa</div>
            </div>
            <div className="child-content">
              <div className="">
                <b>Cơ sở y tế</b>
              </div>
              <div className="sub-titles">Chọn bệnh viện phòng khám</div>
            </div>
            <div className="child-content">
              <div className="">
                <b>Bác sỹ</b>
              </div>
              <div className="sub-titles">Chọn bác sỹ giỏi</div>
            </div>
            <div className="child-content">
              <div className="">
                <b>Gói khám</b>
              </div>
              <div className="sub-titles">Khám sức khỏe tổng quát</div>
            </div>
          </div>
          <div className="right-content">
            <div className="support"><i className="fas fa-question-circle"></i>Hỗ trợ</div>
            <div className="region">VN</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
