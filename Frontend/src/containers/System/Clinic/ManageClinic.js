import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { toast } from "react-toastify";
import {
  createNewClinic,
  deleteClinic,
  editClinic,
  getAllClinic,
  getAllDetailClinicById,
  getDetailInforDoctor,
} from "../../../services/userService";
import Select from "react-select";
import * as actions from "../../../store/actions";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
      image: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      listClinic: [],
      selectClinic: "",
      clinic: "",
    };
  }

  async componentDidMount() {
    this.props.getRequiredDoctorInfor();
    await this.getAllClinic();
    let clinic = this.props.item;
    if (clinic && !_.isEmpty(clinic)) {
      this.setState({
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        descriptionHTML: clinic.descriptionHTML,
        descriptionMarkdown: clinic.descriptionMarkdown,
        image: clinic.imageBase64,
      });
    }
  }
  getAllClinic = async () => {
    try {
      const response = await getAllClinic("All");

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    /*  if (prevProps.allClinics !== this.props.allClinics) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allClinics,
        "CLINIC"
      );
      this.setState({
        listClinic: dataSelect,
      });
    } */
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resClinic } = this.props.allRequiredDoctorInfor;

      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: html,
      descriptionHTML: text,
    });
  };

  handleCreateClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("add new Clinic succeed");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("add new Clinic error");
    }
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
        console.log("check input CLINIC", inputData);
      }
    }
    return result;
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        avatar: objectUrl,
        imageBase64: base64,
      });
    }
  };

  handleChangeClinic = (selectClinic) => {
    this.setState({ selectClinic }, () =>
      console.log(`Option selected:`, this.state.selectClinic)
    );
    console.log(`Option selectClinic:`, this.state.selectClinic);
  };

  handleChangeSelect = async (selectClinic) => {
    this.setState({ selectClinic });
    let { listClinic } = this.state;

    let res = await getAllDetailClinicById({ id: selectClinic.value });
    if (res && res.errCode === 0) {
      let clinic = res.data.Clinic;
      let name = "",
        address = "",
        image = "",
        selectClinic = "",
        id = "";
      if (res.data.Clinic) {
        name = res.data.Clinic.name;
        address = res.data.Clinic.address;
        image = res.data.Clinic.image;
        selectClinic = listClinic.find((item) => {
          return item && item.value === id;
        });
        console.log("res.data.Clinic", listClinic);
      }
      this.setState({
        descriptionHTML: res.data.descriptionHTML,
        descriptionMarkdown: res.data.descriptionMarkdown,
        address: res.data.address,
        name: res.data.name,
        image: res.data.image,
        selectClinic: selectClinic,
        id: this.state.selectClinic.value,
      });
    } else {
      this.setState({
        descriptionHTML: "",
        descriptionMarkdown: "",
        selectClinic: "",
        address: "",
        name: "",
        image: "",
        id: "",
      });
      console.log(res);
    }
    console.log(this.state);
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  openPrevviewImage = () => {
    if (!this.state.imageBase64) return;
    this.setState({
      isOpen: true,
    });
  };

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleEditClinic = async () => {
    const {
      name,
      address,
      imageBase64,
      descriptionHTML,
      descriptionMarkdown,
      id,
    } = this.state;

    try {
      // Prepare clinic data to send for editing
      const clinicData = {
        id,
        name,
        address,
        image: imageBase64,
        descriptionHTML,
        descriptionMarkdown,
      };

      // Call the editClinic function with the updated clinic data
      const res = await editClinic(clinicData);

      // Check if the edit was successful
      if (res && res.errCode === 0) {
        console.log("Clinic updated successfully:", res.data);
        // Optionally, you can update state or trigger any other action upon successful edit
        toast.success("Clinic updated successfully");
        // Clear the form fields after successful edit
        this.setState({
          name: "",
          address: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          id: "",
        });
      } else {
        console.error("Error updating clinic:", res.errMessage);
        // Handle error scenario, e.g., display error message, rollback changes, etc.
        // You can also use toast.error to display the error message
        toast.error("Error updating clinic: " + res.errMessage);
      }
    } catch (error) {
      console.error(
        "An unexpected error occurred during clinic update:",
        error
      );
      // Handle unexpected errors, e.g., display generic error message, log error, etc.
      // You can also use toast.error to display the error message
      toast.error(
        "An unexpected error occurred during clinic update. Please try again later."
      );
    }
  };
  handleDeleteClinic = async (clinic) => {
    // Show a confirmation dialog before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (isConfirmed) {
      const res = await deleteClinic(clinic.value);
      console.log("User succeed", res);
      console.log("User succeed", clinic.value);
      if (res && res.errCode === 0) {
        // Successful deletion, update the user list
        console.log("User succeed", res);
      }
    } else {
      // User canceled the deletion
      console.log("User canceled deletion");
    }
  };

  render() {
    console.log("duy check state", this.state);

    let listClinic = this.state.listClinic;
    let { selectClinic } = this.state;
    console.log("User canceled this.state.listClinic.value", selectClinic);
    console.log("duy check state listClinic", this.state.listClinic);
    return (
      <div className="manage-specialty-container container">
        <div className="ms-title">Quan ly Phong Kham</div>

        <div className="add-new-specialty row">
          <div className="col-md-6 form-group">
            <label>Ten Phong Kham</label>
            <input
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeText(event, "name")}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>chon phong kham Phong Kham</label>
            <Select
              name="selectClinic"
              value={this.selectClinic}
              options={this.state.listClinic}
              onChange={this.handleChangeSelect}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              }
            />
          </div>
          <div className="col-md-6 form-group">
            <label>dia chi</label>
            <input
              className="form-control"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeText(event, "address")}
            />
          </div>

          <div className="col-md-6 form-group">
            <div className="col-md-6">
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
                      backgroundImage: `url(${this.state.imageBase64})`,
                    }}
                    onClick={() => this.openPrevviewImage()}
                    className="preview-image"
                  ></div>
                </div>
                {this.state.isOpen === true && (
                  <Lightbox
                    mainSrc={this.state.imageBase64}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                  />
                )}
                <div className="col-md-4">
                  <button
                    className="btn-save-specialty"
                    onClick={() => this.handleCreateClinic()}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
          />
        </div>
        <div className="row center">
          <div className="col-md-4">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleEditClinic()}
            >
              Save
            </button>
          </div>
          <div className="col-md-4">
            {listClinic &&
              listClinic.map((item, index) => (
                <button
                  className="btn-delete"
                  onClick={() => this.handleDeleteClinic(item)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    allClinics: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
