import db from "../models";
require("dotenv").config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

const postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.timeType ||
        !data.doctorId ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      }

      let token = uuidv4();

      await emailService.sendSimpleEmail({
        reciverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redireactLink: buildUrlEmail(data.doctorId, token),
      });

      // Upsert user
      const user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleId: "R3",
          gender: data.selectedGender,
          address: data.address,
          firstName: data.fullName,
        },
      });

      if (user && user[0]) {
        await db.Booking.findOrCreate({
          where: { patientID: user[0].id },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            patientID: user[0].id,
            date: data.date,
            timeType: data.timeType,
            token: token,
          },
        });
        resolve({
          errCode: 0,
          errMessage: " create user sucessed.",
        });
        return;
      }
    } catch (error) {
      reject(error);
    }
  });
};

/* const postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.timeType ||
        !data.doctorId ||
        !data.date ||
        !data.fullName
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      }

      await emailService.sendSimpleEmail({
        reciverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redireactLink: "https://www.youtube.com/watch?v=UyWLW3WPheM",
      });

      // Upsert user
      const user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleId: "R3",
        },
      });

      if (user && user[0]) {
        await db.Booking.findOrCreate({
          where: { patientID: user[0].id },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            patientID: user[0].id,
            date: data.date,
            timeType: data.timeType,
          },
        });
        resolve({
          errCode: 0,
          errMessage: " create user sucessed.",
        });
        return;
      }
    } catch (error) {
      reject(error);
    }
  });
}; */

let postVerifyBookAppoiment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "uppdate the appointment succeed",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exists",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppoiment: postVerifyBookAppoiment,
};
