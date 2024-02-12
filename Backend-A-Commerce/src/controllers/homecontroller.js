const nodemailer = require('nodemailer');
const { GetOtpsModel } = require('../models/index')

const Authentication = async (req, res) => {
    let OTP = await Math.max(100001, Math.round(Math.random() * 999998))

    GetOtpsModel.create({
        mobile: req.body.number,
        generate_otp: OTP,
        is_verify: 0
      })
    

    let Transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "adarshjoshi132005@gmail.com",
            pass: "crvm achh awcy etzj"
        }
    })

    let MailOption = {
        from: 'adarshjoshi132005@gmail.com',
        to: req.body.email,
        subject: `Hi! ${req.body.name} Your Verfication OTP is ...`,
        html: `Your Verification OTP is <b>${OTP} for A-Commerce Account</b>`
    }

    Transporter.sendMail(MailOption).then((info) => {

        if (info.accepted) {
            return res.json({ msg: `Email sent successfully to ${info.accepted} with OTP ${OTP}`, otp: OTP, applicantmail: info.accepted })
        }

    }).catch((err) => {
        return res.status(500).json({ err })
    })

}

module.exports = { Authentication } 