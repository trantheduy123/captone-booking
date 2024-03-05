import db from "../models/index";

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter ",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Oke",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image).toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailClinicById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "address",
            "name",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });

        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
        } else data = [];
        resolve({
          errCode: 0,
          errMessage: "ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if 'id' is missing in the data
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter: id",
        });
        return; // Return to avoid proceeding further
      }

      // Find the user by 'id'
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false,
      });

      // Check if the user is found
      if (clinic) {
        // Update user data
        clinic.name = data.name;
        clinic.address = data.address;
        clinic.descriptionMarkdown = data.descriptionMarkdown;
        clinic.descriptionHTML = data.descriptionHTML;
        clinic.image = data.image;

        // Save the updated user
        await clinic.save();

        resolve({
          errCode: 0,
          errMessage: "Update the user succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteClinic = async (clinic) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.Clinic.findOne({
        where: { id: clinic.id },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          errMessage: "The user doesn't exist",
        });
      }
      await db.Clinic.destroy({
        where: { id: clinic.id },
      });
      resolve({
        errCode: 0,
        errMessage: "The user is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  editClinic: editClinic,
  deleteClinic: deleteClinic,
};
