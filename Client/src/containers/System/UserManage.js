import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }
  /**
   * Life cycle
   * Run Component :
   * 1. Run constuctor -> init state
   * 2. Did mount (set state) Call API get data and set state for component
   * 3. Render
   */
  async componentDidMount() {
    let response = await getAllUsers("ALL");
    console.log(response);
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.allusers }, () => {
        console.log(this.state.arrUsers);
      });
    }
  }

  render() {
    console.log("check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="title text-center">MANAGE USER</div>
        <div className="users-table mt-3 mx-5">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>

            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                        <button className="btn-edit"><i className="fas fa-edit"></i></button>
                        <button className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
