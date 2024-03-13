import db from "../models/index";

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
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

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });

        if (data) {
          let doctorSpecialty = [];

          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }
          data.doctorSpecialty = doctorSpecialty;
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

let editSpecialty = (data) => {
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
      let specialty = await db.Specialty.findOne({
        where: { id: data.id },
        raw: false,
      });

      // Check if the user is found
      if (specialty) {
        // Update user data
        specialty.name = data.name;
        specialty.descriptionMarkdown = data.descriptionMarkdown;
        specialty.descriptionHTML = data.descriptionHTML;
        specialty.image = data.image;

        // Save the updated user
        await specialty.save();

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

let deleteSpecialty = async (specialty) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.Specialty.findOne({
        where: { id: specialty.id },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          errMessage: "The Specialty doesn't exist",
        });
      }
      await db.Specialty.destroy({
        where: { id: specialty.id },
      });
      resolve({
        errCode: 0,
        errMessage: "The Specialty is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  editSpecialty: editSpecialty,
  deleteSpecialty: deleteSpecialty,
};
