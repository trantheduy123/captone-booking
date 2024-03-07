import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { toast } from "react-toastify";
import {
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  editSpecialty,
  deleteSpecialty,
} from "../../../services/userService";
import Select from "react-select";
import * as actions from "../../../store/actions";
import _ from "lodash";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      avatar: "",
      listSpecialty: [],
      selectSpecialty: "",
      specialty: "",
      id: "",
      image: "",
    };
  }

  async componentDidMount() {
    this.props.getRequiredDoctorInfor();
    await getAllSpecialty();
    let specialty = this.props.item;
    if (specialty && !_.isEmpty(specialty)) {
      this.setState({
        id: specialty.id,
        name: specialty.name,
        address: specialty.address,
        descriptionHTML: specialty.descriptionHTML,
        descriptionMarkdown: specialty.descriptionMarkdown,
        image: specialty.imageBase64,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resSpecialty } = this.props.allRequiredDoctorInfor;

      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );

      this.setState({
        listSpecialty: dataSelectSpecialty,
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
        avatar: objectUrl,
        imageBase64: base64,
      });
    }
  };

  openPrevviewImage = () => {
    if (!this.state.imageBase64) return;
    this.setState({
      isOpen: true,
    });
  };

  handleOnChangeText = (event, id) => {
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

  handleCreateSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("add new specialty succeed");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("add new specialty error");
    }

    console.log("duy check state", res);
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
        console.log("check input SPECIALTY", inputData);
      }
    }
    return result;
  };

  handleChangeSelect = async (selectSpecialty) => {
    this.setState({ selectSpecialty });
    let { listSpecialty } = this.state;

    let res = await getAllDetailSpecialtyById({ id: selectSpecialty.value });
    if (res && res.errCode === 0) {
      let specialty = res.data.Specialty;
      let name = "",
        image = "",
        selectSpecialty = "",
        id = "";
      if (res.data.Specialty) {
        await getAllSpecialty();
        name = res.data.Specialty.name;

        image = res.data.Specialty.image;
        selectSpecialty = listSpecialty.find((item) => {
          return item && item.value === id;
        });
        console.log("res.data.Specialty", listSpecialty);
      }
      this.setState({
        descriptionHTML: res.data.descriptionHTML,
        descriptionMarkdown: res.data.descriptionMarkdown,
        name: res.data.name,
        image: res.data.image,
        selectSpecialty: selectSpecialty,
        id: this.state.selectSpecialty.value,
      });
    } else {
      this.setState({
        descriptionHTML: "",
        descriptionMarkdown: "",
        selectSpecialty: "",
        name: "",
        image: "",
        id: "",
      });
      console.log(res);
    }
    console.log(this.state);
  };

  handleEditSpecialty = async () => {
    const { name, imageBase64, descriptionHTML, descriptionMarkdown, id } =
      this.state;

    try {
      // Prepare specialty data to send for editing
      const specialtyData = {
        id,
        name,
        image: imageBase64,
        descriptionHTML,
        descriptionMarkdown,
      };

      // Call the editSpecialty function with the updated specialty data
      const res = await editSpecialty(specialtyData);

      // Check if the edit was successful
      if (res && res.errCode === 0) {
        console.log("Specialty updated successfully:", res.data);
        // Optionally, you can update state or trigger any other action upon successful edit
        toast.success("Specialty updated successfully");
        // Clear the form fields after successful edit
        await getAllSpecialty();
        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          id: "",
        });
      } else {
        console.error("Error updating specialty:", res.errMessage);
        // Handle error scenario, e.g., display error message, rollback changes, etc.
        // You can also use toast.error to display the error message
        toast.error("Error updating specialty: " + res.errMessage);
      }
    } catch (error) {
      console.error(
        "An unexpected error occurred during specialty update:",
        error
      );
      // Handle unexpected errors, e.g., display generic error message, log error, etc.
      // You can also use toast.error to display the error message
      toast.error(
        "An unexpected error occurred during specialty update. Please try again later."
      );
    }
  };

  handleDeleteSpecialty = async (id) => {
    if (!id) {
      console.error("No id provided for deletion");
      return;
    }

    // Show a confirmation dialog before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Specialty ?"
    );

    if (isConfirmed) {
      const res = await deleteSpecialty(id);

      if (res && res.errCode === 0) {
        // Successful deletion, update the user list
        console.log("Specialty deleted successfully", res);
        toast.success("Specialty deleted successfully");
        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
      }
    } else {
      // User canceled the deletion
      console.log("Specialty deletion canceled");
    }
  };

  render() {
    console.log("duy check state asdfasdfasdf", this.state);
    //let listSpecialty = this.state.listSpecialty;
    let clinic = this.state.clinic;
    let { selectSpecialty } = this.state;
    let listSpecialty = this.props.listSpecialty;
    console.log("User canceled selectSpecialty", listSpecialty);
    //console.log("User canceled selectSpecialty", data);
    return (
      <div className="manage-specialty-container container">
        <div className="ms-title">
          <FormattedMessage id="admin.manage-doctor.manage-specialty" />
        </div>

        <div className="add-new-specialty row">
          <div className="col-md-6 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.name-specialty" />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeText(event, "name")}
            />
          </div>
          <div className="col-md-6 form-group">
            <label htmlFor="selectClinic">
              <FormattedMessage id="admin.manage-doctor.select-specialty" />
            </label>
            <Select
              id="selectClinic"
              name="selectClinic"
              value={this.selectSpecialty}
              options={this.state.listSpecialty}
              onChange={this.handleChangeSelect}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-specialty" />
              }
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
                    className="btn-save-specialty created"
                    onClick={() => this.handleCreateSpecialty()}
                  >
                    <FormattedMessage id="admin.manage-doctor.create-clinic" />
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
              onClick={() => this.handleEditSpecialty()}
            >
              <FormattedMessage id="admin.manage-doctor.save-clinic" />
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn-save-specialty delete"
              onClick={() => this.handleDeleteSpecialty(this.state.id)}
            >
              <FormattedMessage id="admin.manage-doctor.delete-clinic" />
            </button>
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
    allSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
