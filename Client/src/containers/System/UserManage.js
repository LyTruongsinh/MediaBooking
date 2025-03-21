import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModel: false,
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
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    let response = await getAllUsers("ALL");
    console.log(response);
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.allusers }, () => {
        console.log(this.state.arrUsers);
      });
    }
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModel: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      console.log("check response", response);
      if(response && response.errCode !== 0) {
        alert(response.message);
      }
      else {
        await this.getAllUsers();
        this.setState({
          isOpenModel: false,
        })
      }
    } catch (e) {
      console.log("Error when create new user", e);
      return;
    }
    console.log("check data", data);
  }
  render() {
    console.log("check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModel}
          toggleFromParent={this.toggleUserModal}
          createNewUser = {this.createNewUser}
        />
        <div className="title text-center">MANAGE USER</div>
        <div className="mx-5">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-5">
          <table id="customers">
          <tbody>
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
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
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
