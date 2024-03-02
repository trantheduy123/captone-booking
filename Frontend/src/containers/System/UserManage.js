import React, { Component } from "react";

import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";

import {
  getAllUsers,
  createNewUserServicer,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenEditModal: true,
      editedUser: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    try {
      const response = await getAllUsers("All");

      if (response && response.errCode === 0) {
        this.setState({
          arrUsers: response.users,
        });
      } else {
        console.error("Error fetching users:", response.errMessage);
        // You might want to set a different state or show an error message to the user
      }
    } catch (error) {
      console.error(
        "An unexpected error occurred during user fetching:",
        error
      );
      // You might want to set a different state or show an error message to the user
    }
  };
  createNewuser = async (data) => {
    try {
      let response = await createNewUserServicer(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
      console.log("respone create user", response);
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      // Show a confirmation dialog before deleting
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (isConfirmed) {
        const res = await deleteUserService(user.id);
        if (res && res.errCode === 0) {
          // Successful deletion, update the user list
          await this.getAllUsersFromReact();
        }
      } else {
        // User canceled the deletion
        console.log("User canceled deletion");
      }
    } catch (e) {
      // Handle unexpected errors
      console.error("An error occurred during user deletion:", e);
      alert("An unexpected error occurred. Please try again later.");
    }
    await this.getAllUsersFromReact();
  };
  editUser = (user) => {
    this.setState({
      isEditModalOpen: true,
      editedUser: user,
    });
  };

  handleEditUser = (user) => {
    console.log("check user", user);
    this.setState({
      isOpenEditModal: true,
    });
  };

  editUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        console.log("User updated successfully:", res.data);
        this.setState({
          isEditModalOpen: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert("Error updating user:", res.errMessage);
      }
    } catch (error) {
      console.error("An unexpected error occurred during user update:", error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <div className="title text-center">Manage users with duy</div>
        <div className="mx-1">
          <ModalUser createNewuser={this.createNewuser} />
        </div>
        <div className="user-table mt-3 mx-1 ">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>Frist Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.roleId}</td>
                    <td>{item.gender}</td>
                    <td>
                      <ModalEditUser item={item} editUser={this.editUser} />

                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
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
