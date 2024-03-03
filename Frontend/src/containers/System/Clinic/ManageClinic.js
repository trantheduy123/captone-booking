import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { toast } from "react-toastify";
import { createNewClinic } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      /* address: "", */
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
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

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSaveClinic = async () => {
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

  render() {
    console.log("duy check state", this.state);
    return (
      <div className="manage-specialty-container container">
        <div className="ms-title">Quan ly Phong Kham</div>

        <div className="add-new-specialty row">
          <div className="col-md-6 form-group">
            <label>Ten Phong Kham</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnchangeInput(event, "name")}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>dia chi</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnchangeInput(event, "address")}
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
        <div className="col-md-12">
          <button
            className="btn-save-specialty"
            onClick={() => this.handleSaveClinic()}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
