const nodemailer = require('nodemailer');
const { GetOtps, Customers, Products } = require('../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models/index');
require('dotenv').config();


const Authentication = async (req, res) => {
    let OTP = await Math.max(100001, Math.round(Math.random() * 999998))

    GetOtps.create({
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
            return res.status(200).json({ msg: `Email sent successfully to ${info.accepted} with OTP ${OTP}`, success: true, otp: OTP, applicantmail: info.accepted })
        } else {
            return res.status(500).json({ msg: `Email with OTP ${OTP} Not Sent`, success: false })
        }

    }).catch((err) => {
        return res.status(500).json({ ERROR: err })
    })

}

const Register = async (req, res) => {
    try {

        const UpdateUserVerification = await GetOtps.update(
            { is_verify: 1 },
            { where: { generate_otp: req.body.OTP } }
        )

        if (UpdateUserVerification) {
            const Password = await bcrypt.hash(req.body.password, 10);

            const RegisterCustomer = await Customers.create({
                full_name: req.body.name,
                mobile: req.body.number,
                email: req.body.email,
                password: Password,
                token: null
            })

            if (RegisterCustomer) {
                res.status(200).json({ msg: "User Added Successfully", success: true, name: req.body.name })

            } else {
                res.status(500).json({ msg: "Customer not created successfully", success: false, name: req.body.name })
            }
        } else {
            res.status(500).json({ msg: "OTP not Updated", success: false })
        }


    } catch (err) {

        console.log("errror found: ", err)
        res.status(500).json({ error: 'Internal Server Error' })

    }

}

const Login = async (req, res) => {

    try {
        const Identifiers = req.body.identifier
        var isEmail = false;

        for (const Identifier of Identifiers) {

            function asynchronousOperation(Identifier) {
                if (Identifier == '@') {

                    isEmail = true
                }
            }
            await asynchronousOperation(Identifier)

        }

        const User = await Customers.findOne({
            where: isEmail ?
                { email: req.body.identifier } : { mobile: req.body.identifier }
        })

        if (!User) {
            res.status(500).json({ msg: "Wrong Phone Number Or Password!", success: false })
        }
        const userhash = User.dataValues.password

        const UserIdConfirmation = await bcrypt.compare(req.body.password, userhash)

        if (UserIdConfirmation) {
            let userIdentifier = User.dataValues.Identifiers
            const token = await jwt.sign({ userIdentifier }, process.env.SECRET_KEY, { expiresIn: '48h' })
            res.status(200).json({ msg: "User Login Successfully!", success: true, userToken: token })

        } else {
            res.status(500).json({ msg: "Wrong Password!", success: false })
        }

    } catch (err) {
        res.status(500).json({ ERROR: err, success: false });
    }

}

const GetProductData = async (req, res) => {
    console.log("ok")
    const [results, metadata] = await sequelize.query('SELECT * FROM products')

    if (results) {
        res.status(200).json({ msg: "Successfull To Get Data!!", status: false, ProductsData: results })
    } else {
        res.status(500).json({ msg: "Unsuccessfull To Get Data!!", status: false })
    }
}

module.exports = { Authentication, Register, Login, GetProductData } 