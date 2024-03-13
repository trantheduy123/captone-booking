import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBlog.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { toast } from "react-toastify";
import {
  createNewBlog,
  editBlog,
  deleteBlog,
  getAllBlog,
  getAllDetailBlogById,
  getDetailInforDoctor,
} from "../../../services/userService";
import Select from "react-select";
import * as actions from "../../../store/actions";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      listBlog: [],
      selectBlog: "",
      blog: "",
      id: "",
    };
  }

  async componentDidMount() {
    this.props.getRequiredDoctorInfor();
    let blog = this.props.item;
    if (blog && !_.isEmpty(blog)) {
      this.setState({
        id: blog.id,
        name: blog.name,
        descriptionHTML: blog.descriptionHTML,
        descriptionMarkdown: blog.descriptionMarkdown,
        image: blog.imageBase64,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /*  if (prevProps.allClinics !== this.props.allClinics) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allClinics,
        "CLINIC"
      );
      this.setState({
        listBlog: dataSelect,
      });
    } */
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resBlog } = this.props.allRequiredDoctorInfor;

      let dataSelectBlog = this.buildDataInputSelect(resBlog, "BLOG");

      this.setState({
        listBlog: dataSelectBlog,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: html,
      descriptionHTML: text,
    });
  };

  handleCreateBlog = async () => {
    let res = await createNewBlog(this.state);
    if (res && res.errCode === 0) {
      toast.success("add new Blog succeed");
      await getAllBlog();
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("add new Blog error");
    }
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "BLOG") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
        console.log("check input BLOG", inputData);
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

  handleChangeSelect = async (selectBlog) => {
    this.setState({ selectBlog });
    let { listBlog } = this.state;

    let res = await getAllDetailBlogById({ id: selectBlog.value });
    if (res && res.errCode === 0) {
      let blog = res.data.Blog;
      let name = "",
        image = "",
        selectBlog = "",
        id = "";
      if (res.data.Blog) {
        name = res.data.Blog.name;
        image = res.data.Blog.image;
        selectBlog = listBlog.find((item) => {
          return item && item.value === id;
        });
        console.log("res.data.Blog", listBlog);
      }
      this.setState({
        descriptionHTML: res.data.descriptionHTML,
        descriptionMarkdown: res.data.descriptionMarkdown,
        address: res.data.address,
        name: res.data.name,
        image: res.data.image,
        selectBlog: selectBlog,
        id: this.state.selectBlog.value,
      });
    } else {
      this.setState({
        descriptionHTML: "",
        descriptionMarkdown: "",
        selectBlog: "",
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

  handleEditBlog = async () => {
    const { name, imageBase64, descriptionHTML, descriptionMarkdown, id } =
      this.state;

    try {
      // Prepare clinic data to send for editing
      const blogData = {
        id,
        name,
        image: imageBase64,
        descriptionHTML,
        descriptionMarkdown,
      };

      // Call the editClinic function with the updated clinic data
      const res = await editBlog(blogData);

      // Check if the edit was successful
      if (res && res.errCode === 0) {
        console.log(" Blog updated successfully:", res.data);
        // Optionally, you can update state or trigger any other action upon successful edit
        toast.success(" Blog updated successfully");
        // Clear the form fields after successful edit
        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          id: "",
        });
      } else {
        console.error("Error updating  Blog:", res.errMessage);
        // Handle error scenario, e.g., display error message, rollback changes, etc.
        // You can also use toast.error to display the error message
        toast.error("Error updating  Blog: " + res.errMessage);
      }
    } catch (error) {
      console.error("An unexpected error occurred during  Blog update:", error);
      // Handle unexpected errors, e.g., display generic error message, log error, etc.
      // You can also use toast.error to display the error message
      toast.error(
        "An unexpected error occurred during  Blog update. Please try again later."
      );
    }
  };
  handleDeleteBlog = async (id) => {
    // Show a confirmation dialog before deleting
    if (!id) {
      console.error("No id provided for deletion");
      return;
    }
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Clinic ?"
    );

    if (isConfirmed) {
      const res = await deleteBlog(id);

      if (res && res.errCode === 0) {
        // Successful deletion, update the user list
        console.log("User succeed", res);
        toast.success("Clinic deleted successfully");
        this.setState({
          name: "",

          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
      }
    } else {
      // User canceled the deletion
      console.log("Clinic canceled deletion");
    }
  };

  render() {
    console.log("duy check state", this.state);

    let listBlog = this.state.listBlog;
    let { selectBlog } = this.state;
    console.log("User canceled this.state.listBlog.value", selectBlog);
    console.log("duy check state listBlog", this.state.listBlog);
    return (
      <div className="manage-specialty-container container">
        <div className="ms-title">
          <FormattedMessage id="admin.manage-doctor.manage-blog" />
        </div>

        <div className="add-new-specialty row">
          <div className="col-md-6 form-group">
            <label htmlFor="name">
              {" "}
              <FormattedMessage id="admin.manage-doctor.name-blog" />
            </label>
            <input
              id="name"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeText(event, "name")}
            />
          </div>
          <div className="col-md-6 form-group">
            <label htmlFor="selectBlog">
              <FormattedMessage id="admin.manage-doctor.select-blog" />
            </label>
            <Select
              id="selectBlog"
              name="selectBlog"
              value={this.selectBlog}
              options={this.state.listBlog}
              onChange={this.handleChangeSelect}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-blog" />
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
                    <FormattedMessage id="manage-user.image" />{" "}
                    <i className="fas fa-upload"></i>
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
                    onClick={() => this.handleCreateBlog()}
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
              onClick={() => this.handleEditBlog()}
            >
              <FormattedMessage id="admin.manage-doctor.save-clinic" />
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn-save-specialty delete"
              onClick={() => this.handleDeleteBlog(this.state.id)}
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
    allBlogs: state.admin.allBlogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBlog);
