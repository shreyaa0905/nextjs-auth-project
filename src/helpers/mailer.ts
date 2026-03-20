import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        //create a hashed token
        const hashedToken= await bcryptjs.hash(userId.toString(),10)
if(emailType==="VERIFY"){
    await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})
}else if (emailType==="RESET"){
    await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry:Date.now()+3600000})
}

const transporter=nodemailer.createTransport({
    host:"sandbox.smtp.mailtrap.io",
    port:2525,
    auth:{
        user:"6f74df02092578",
        pass:"73c5a9bada70ee"
        //TODO:add these credentials to .env file
    }
});

const mailOptions = {
  from: "shreya@gmail.com",
  to: email,
  subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",

  html: emailType === "VERIFY"
    ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email</p>`
    : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password</p>`
};
const mailResponse=await transporter.sendMail(mailOptions);

 return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
        
       
    }
}
