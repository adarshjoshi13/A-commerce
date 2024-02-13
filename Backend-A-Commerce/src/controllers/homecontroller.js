const nodemailer = require('nodemailer');
const { GetOtps, Customers } = require('../models/index')
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

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
            return res.json({ msg: `Email sent successfully to ${info.accepted} with OTP ${OTP}`, otp: OTP, applicantmail: info.accepted })
        }

    }).catch((err) => {
        return res.status(500).json({ err })
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
                password: Password
            })

            if (RegisterCustomer) {
                res.status(200).json({ msg: "User Added Successfully", name: req.body.name })
            }
        }


    } catch (err) {

        console.log("errror found: ", err)
        res.status(500).json({ error: 'Internal Server Error' })

    }

}

const Login = async (req, res) => {

    try {
        req.session.msg = "helllo bhaishaab"
        const Identifiers = req.body.identifier
        var isEmail = false;

        for (const Identifier of Identifiers) {

            function asynchronousOperation(Identifier) {
                if (Identifier == '@') {
                    console.log("Is Email Id")
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
            res.status(400).json({ msg: "Wrong Phone Number Or Password!" })
        }
        const userhash = User.dataValues.password

        const UserIdConfirmation = await bcrypt.compare(req.body.password, userhash)

        if (UserIdConfirmation) {
            console.log(req.session,"check session")
            res.status(200).json({ msg: "User Login Successfully!" })
        } else {
            res.status(400).json({ msg: "Wrong Password Successfully!" })
        }

    } catch (err) {
        res.status(400).json({ error: `Error found: ${err}` });
    }

}

const Test = (req, res)=> {
    req.session.msg = "hello bhaishaab"
    res.end()
}

module.exports = { Authentication, Register, Login, Test } 