const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sellers } = require('../models/index')
const { sequelize } = require('../models/index');
require('dotenv').config();


const SellerRegister = async (req, res) => {
    try {

        let Transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "adarshjoshi132005@gmail.com",
                pass: "crvm achh awcy etzj"
            }
        })


        const Password = await bcrypt.hash(req.body.password, 10);

        const RegisterCustomer = await Sellers.create({
            full_name: req.body.name,
            email: req.body.email,
            password: Password,
            is_verify: 0
        })

        if (RegisterCustomer) {

            const Seller = await Sellers.findOne({
                Raw: true,
                where: { email: req.body.email }
            })

            const Payload = {
                sellerId: Seller.id,
                sellerName: Seller.full_name
            }

            console.log(Payload)
            const token = jwt.sign(Payload, process.env.SECRET_KEY, { expiresIn: '1h' })

            if (token) {
                let verificationLink = `http://localhost:5000/verify-account/${token}`
                let MailOption = {
                    from: 'adarshjoshi132005@gmail.com',
                    to: req.body.email,
                    subject: `Hi! ${req.body.name} Your Verification Mail Is Here!!`,
                    html: `
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Arial', sans-serif; color: #333;">
                      <h2 style="color: #4CAF50;">A-Commerce Account Verification</h2>
                      <p>Hi ${req.body.name},</p>
                      <p>Click the button below to <b>verify your account:</b></p>
                      <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">
                        Verify Account
                      </a>
                      <p>If you didn't request this verification, please ignore this email.</p>
                      <p>Thank you for using A-Commerce!</p>
                    </div>
                  `,
                };

                Transporter.sendMail(MailOption).then((info) => {
                    if (info.accepted) {
                        res.status(200).json({ msg: "Account created Successfully! Verify To Login ", success: true })
                    } else {
                        res.status(500).json({ msg: `Unsuccesfully to create account`, success: false })
                    }

                }).catch((Err) => {
                    res.status(500).json({ msg: "Mail not sent!!", success: false, Error: Err })
                })


            }

        } else {
            res.status(500).json({ msg: "Seller Not Registered Successfully", success: false })
        }

    } catch (Err) {
        console.log("Error Found While Registering Seller", Err)
        res.status(500).json({ error: `Fail To Register Seller: ${Err} ` })
    }

}

const VerifyUser = async (req, res) => {
    try {
        const token = req.params.verificationToken
        const userInfo = jwt.decode(token)
        console.log(userInfo)
        const verifiedUser = await Sellers.update(
            { is_verify: 1 },
            {
                where: {
                    id: userInfo.sellerId,
                    full_name: userInfo.sellerName
                },
                returning: true,
                plain: true
            }
        );

        if (verifiedUser) {
            res.status(200).json({ msg: "Account Verified Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Account Is Not Verified", success: false })
        }

    } catch (Err) {
        console.log("Error Found While Verifying Seller", Err)
        res.status(500).json({ msg: `Fail To Verifying Seller: ${Err} ` })
    }
}

const SellerLogin = async (req, res) => {
    try {
        console.log(req.body)
        const user = await Sellers.findOne({
            raw: true,
            where: { email: req.body.mail }
        });

        if (!user) {
            return res.status(301).json({ msg: "Wrong Email!", success: false });
        }

        const userhash = user.password;

        const passwordMatch = await bcrypt.compare(req.body.password, userhash);

        if (passwordMatch) {
            res.status(200).json({
                msg: "User Login Successfully!",
                success: true,
                data: { userData: user }
            });
        } else {
            res.status(500).json({ msg: "Wrong Password!", success: false });
        }
    } catch (Err) {
        console.log("Error Found While Sign In Buyer", Err)
        res.status(301).json({ msg: `Fail To Sign In Buyer: ${Err}`, success: false })
    }
};


module.exports = { SellerRegister, VerifyUser, SellerLogin }