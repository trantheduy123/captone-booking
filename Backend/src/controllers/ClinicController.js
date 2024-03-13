import db from "../models/index";
import ClinicService from "../services/ClinicService";

let createClinic = async (req, res) => {
  try {
    let infor = await ClinicService.createClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let infor = await ClinicService.getAllClinic();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let infor = await ClinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let editClinic = async (req, res) => {
  let data = req.body;
  let message = await ClinicService.editClinic(data);
  return res.status(200).json(message);
};

let deleteClinic = async (req, res) => {
  try {
    let infor = await ClinicService.deleteClinic(req.body);
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
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  editClinic: editClinic,
  deleteClinic: deleteClinic,
};
