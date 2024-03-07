import db from "../models/index";
import BlogService from "../services/BlogService";

let createBlog = async (req, res) => {
  try {
    let infor = await BlogService.createBlog(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllBlog = async (req, res) => {
  try {
    let infor = await BlogService.getAllBlog();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDetailBlogById = async (req, res) => {
  try {
    let infor = await BlogService.getDetailBlogById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let editBlog = async (req, res) => {
  let data = req.body;
  let message = await BlogService.editBlog(data);
  return res.status(200).json(message);
};

let deleteBlog = async (req, res) => {
  try {
    let infor = await BlogService.deleteBlog(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
module.exports = {
  createBlog: createBlog,
  getAllBlog: getAllBlog,
  getDetailBlogById: getDetailBlogById,
  editBlog: editBlog,
  deleteBlog: deleteBlog,
};
