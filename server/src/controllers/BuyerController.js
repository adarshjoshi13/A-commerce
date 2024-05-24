const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GetOtps, Buyers } = require('../models/index')
const { sequelize } = require('../models/index');
require('dotenv').config();


const BuyerAuthentication = async (req, res) => {
    let OTP = await Math.max(100001, Math.round(Math.random() * 999998))

    GetOtps.create({
        mobile: req.body.number,
        generate_otp: OTP
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
            return res.status(200).json({ msg: `Email sent successfully to ${info.accepted} with OTP ${OTP}`, success: true, otp: OTP, applicantmail: info.accepted })
        } else {
            return res.status(500).json({ msg: `Email with OTP ${OTP} Not Sent`, success: false })
        }

    }).catch((err) => {
        return res.status(500).json({ ERROR: err })
    })

}

const BuyerRegister = async (req, res) => {
    try {

        const UpdateUserVerification = await GetOtps.update(
            { is_verify: 1 },
            { where: { generate_otp: req.body.OTP } }
        )

        if (UpdateUserVerification) {
            const Password = await bcrypt.hash(req.body.password, 10);

            const RegisterCustomer = await Buyers.create({
                full_name: req.body.name,
                mobile: req.body.number,
                email: req.body.email,
                password: Password
            })

            if (RegisterCustomer) {

                const User = await Buyers.findOne({
                    where: { mobile: req.body.number }
                })

                const UpdateOfUser = await GetOtps.update(
                    { of_user: User.dataValues.id },
                    { where: { generate_otp: req.body.OTP } }
                )

                if (UpdateOfUser) {
                    res.status(200).json({ msg: "User Added Successfully", success: true, name: req.body.name })
                }

            } else {
                res.status(500).json({ msg: "Customer not created successfully", success: false, name: req.body.name })
            }
        } else {
            res.status(500).json({ msg: "OTP not Updated", success: false })
        }


    } catch (err) {

        console.log("Error Found While Registering Buyer", Err)
        res.status(500).json({ error: `Fail To Register Buyer: ${Err}` })

    }

}

const BuyerLogin = async (req, res) => {
    try {

        let identifier = req.body.identifier;
        var isEmail = false;

        for (const char of identifier) {
            if (char === '@') {
                isEmail = true;
                break;
            }
        }

        const user = await Buyers.findOne({
            where: isEmail ? { email: identifier } : { mobile: identifier }
        });

        if (!user) {
            return res.status(500).json({ msg: "Wrong Phone Number Or Email!", success: false });
        }

        const userhash = user.dataValues.password;

        const passwordMatch = await bcrypt.compare(req.body.password, userhash);

        if (passwordMatch) {

            const token = await jwt.sign({ identifier }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({
                msg: "User Login Successfully!",
                success: true,
                data: { userToken: token, userData: user.dataValues }
            });
        } else {
            res.status(500).json({ msg: "Wrong Password!", success: false });
        }
    } catch (Err) {
        console.log("Error Found While Sign In Buyer", Err)
        res.status(500).json({ msg: `Fail To Sign In Buyer: ${Err}`, success: false })
    }
};

const GetUserData = async (req, res) => {
    try {
        let userId = req.params.BuyerId

        const getUserData = await Buyers.findOne({
            where: { id: userId }
        })

        if (getUserData) {
            res.status(200).json({ msg: "User Data Retrive Successfully", success: false, data: getUserData.dataValues })
        } else {
            res.status(500).json({ msg: "Failed To Get User Data", success: false })
        }

    } catch (Err) {
        console.log("Error While Getting User Data: ", Err)
        res.status(500).json({ msg: "Error while getting user data" })
    }
}


module.exports = { BuyerAuthentication, BuyerRegister, BuyerLogin, GetUserData }