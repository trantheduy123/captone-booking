import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        userRedux: this.props.listUser,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteAllUserRedux(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };
  render() {
    let arrUsers = this.state.userRedux;
    return (
      <React.Fragment>
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
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.roleId}</td>
                    <td>{item.gender}</td>
                    <td>
                      <button
                        onClick={() => this.handleDeleteUser(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button
                        className="btn-edit"
                        color="primary"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAllUserRedux: (id) => dispatch(actions.deleteAllUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
