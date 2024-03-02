require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Booking Clinic 👻" <trantheduy@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line

    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
 
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <h3 style="color: #007bff; text-align: center; margin-bottom: 20px;">Xin chào ${dataSend.patientName},</h3>
  <p style="color: #555; text-align: justify;">Bạn nhận được Email này vì đã đặt lịch khám bệnh Online trên Booking Clinic.</p>
  <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;">
    <p style="color: #333; margin: 0;"><b>Thời gian:</b> ${dataSend.time}</p>
    <p style="color: #333; margin: 0;"><b>Bác sĩ:</b> ${dataSend.doctorName}</p>
  </div>
  <p style="color: #555; text-align: justify; margin-top: 20px;">Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất lịch khám bệnh.</p>
  <div style="text-align: center; margin-top: 20px;">
    <a href="${dataSend.redireactLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Xác nhận lịch hẹn</a>
  </div>
  <p style="color: #555; text-align: center; margin-top: 20px;">Xin chân thành cảm ơn !!!</p>
</div>
`;
  }
  if (dataSend.language === "en") {
    result = `
 
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <h3 style="color: #007bff; text-align: center; margin-bottom: 20px;">Hello ${dataSend.patientName},</h3>
  <p style="color: #555; text-align: justify;">You have received this email because you have booked an online appointment at Booking Clinic.</p>
  <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;">
    <p style="color: #333; margin: 0;"><b>Appointment Time:</b> ${dataSend.time}</p>
    <p style="color: #333; margin: 0;"><b>Doctor:</b> ${dataSend.doctorName}</p>
  </div>
  <p style="color: #555; text-align: justify; margin-top: 20px;">If the above information is correct, please click on the link below to confirm and complete your appointment.</p>
  <div style="text-align: center; margin-top: 20px;">
    <a href="${dataSend.redireactLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Confirm Appointment</a>
  </div>
  <p style="color: #555; text-align: center; margin-top: 20px;">Thank you very much !!!</p>
</div>

  
`;
  }

  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
