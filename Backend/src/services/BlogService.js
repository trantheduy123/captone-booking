import db from "../models/index";

let createBlog = (data) => {
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
          errMessage: "Missing parameter ",
        });
      } else {
        await db.Blog.create({
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

let getAllBlog = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Blog.findAll();
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

let getDetailBlogById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Blog.findOne({
          where: {
            id: inputId,
          },
          attributes: ["name", "descriptionHTML", "descriptionMarkdown"],
        });

        // If no data found, return an empty object
        if (!data) data = {};

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

let editBlog = (data) => {
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
      let blog = await db.Blog.findOne({
        where: { id: data.id },
        raw: false,
      });

      // Check if the user is found
      if (blog) {
        // Update user data
        blog.name = data.name;
        blog.descriptionMarkdown = data.descriptionMarkdown;
        blog.descriptionHTML = data.descriptionHTML;
        blog.image = data.image;

        // Save the updated user
        await blog.save();

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

let deleteBlog = async (blog) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.Blog.findOne({
        where: { id: blog.id },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          errMessage: "The blog doesn't exist",
        });
      }
      await db.Blog.destroy({
        where: { id: blog.id },
      });
      resolve({
        errCode: 0,
        errMessage: "The blog is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createBlog: createBlog,
  getAllBlog: getAllBlog,
  getDetailBlogById: getDetailBlogById,
  editBlog: editBlog,
  deleteBlog: deleteBlog,
};
