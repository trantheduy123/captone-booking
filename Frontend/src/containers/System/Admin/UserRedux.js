import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      roleId: "",
      avatar: "",
      userEditId: "",
      action: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0)
        this.setState({
          genderArr: res.data,
        });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }

    if (prevProps.listUser !== this.props.listUser) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPosition = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTION.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPrevviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required" + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;

    if (action === CRUD_ACTION.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      //fire redux edit user
      this.props.editAllUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phonenumber,
      gender: user.gender,
      position: user.positionId,
      roleId: user.roleId,
      previewImgURL: imageBase64,
      avatar: "",
      action: CRUD_ACTION.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let posotions = this.state.positionArr;
    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      position,
      roleId,
      avatar,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {" "}
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isGetGenders === true ? "Loadingender" : " "}{" "}
              </div>
              <div className="col-3">
                <label className="col-sm-2 col-form-label">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => {
                        this.onChangeInput(event, "email");
                      }}
                      disabled={
                        this.state.action === CRUD_ACTION.EDIT ? true : false
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className=" col-form-label">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      disabled={
                        this.state.action === CRUD_ACTION.EDIT ? true : false
                      }
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => {
                        this.onChangeInput(event, "password");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(event) => {
                        this.onChangeInput(event, "firstName");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(event) => {
                        this.onChangeInput(event, "lastName");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(event) => {
                        this.onChangeInput(event, "phoneNumber");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-9">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => {
                        this.onChangeInput(event, "address");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <select
                      value={gender}
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(event) => {
                        this.onChangeInput(event, "gender");
                      }}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <select
                      className="form-select"
                      value={position}
                      aria-label="Default select example"
                      onChange={(event) => {
                        this.onChangeInput(event, "position");
                      }}
                    >
                      {posotions &&
                        posotions.length > 0 &&
                        posotions.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(event) => {
                        this.onChangeInput(event, "roleId");
                      }}
                      value={roleId}
                    >
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      id="previewImg"
                      onChange={(event) => this.handleOnchangeImage(event)}
                      type="file"
                      hidden
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    <div
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.openPrevviewImage()}
                      className="preview-image"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button
                  type="button"
                  className={
                    this.state.actions === CRUD_ACTION.EDIT
                      ? "btn btn-warning"
                      : "btn btn-success"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.actions === CRUD_ACTION.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        <TableManageUser
          handleEditUserFromParentKey={this.handleEditUserFromParent}
          actions={this.state.actions}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editAllUserRedux: (data) => dispatch(actions.editAllUser(data)),
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguegeAppRedux: (language) =>
      dispatch(actions.changeLanguegeApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
