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
        let identifier = req.body.identifier;
        var isEmail = false;

        for (const char of identifier) {
            if (char === '@') {
                isEmail = true;
                break;
            }
        }

        const user = await Customers.findOne({
            where: isEmail ? { email: identifier } : { mobile: identifier }
        });

        if (!user) {
            return res.status(401).json({ msg: "Wrong Phone Number Or Email!", success: false });
        }

        const userhash = user.dataValues.password;

        const passwordMatch = await bcrypt.compare(req.body.password, userhash);

        if (passwordMatch) {

            const token = await jwt.sign({ identifier }, process.env.SECRET_KEY, { expiresIn: '48h' });
            res.status(200).json({
                msg: "User Login Successfully!",
                success: true,
                data: { userToken: token, userData: user.dataValues }
            });
        } else {
            res.status(401).json({ msg: "Wrong Password!", success: false });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ ERROR: err.message, success: false });
    }
};

const GetProductData = async (req, res) => {
    const [results, metadata] = await sequelize.query('SELECT * FROM products')

    if (results) {
        res.status(200).json({ msg: "Successfull To Get Data!!", status: false, ProductsData: results })
    } else {
        res.status(500).json({ msg: "Unsuccessfull To Get Data!!", status: false })
    }
}

const GetProduct = async (req, res) => {

    try {
        let productId = req.params.id

        const result = await Products.findOne({
            where: { id: productId }
        })

        if (result) {
            res.status(200).json({ msg: "Product Find Successfully!!", success: true, productData: result.dataValues })
        } else {
            res.status(500).json({ msg: "Product Find Successfully!!", success: false })
        }

    } catch (err) {
        console.log("Error Found: ", err)
    }

}

// const VerifyUser = async (req, res) => {

//     let token = req.body.token
//     var isEmail = false;

//     const userIdentifier = await jwt.verify(token, process.env.SECRET_KEY);
//     let Identifier = userIdentifier.Identifiers

//     for (const Identifiers of Identifier) {

//         function asynchronousOperation(Identifier) {
//             if (Identifiers == '@') {

//                 isEmail = true
//             }
//         }
//         await asynchronousOperation(Identifiers)

//     }

//     const CustomerInfo = await Customers.findOne({
//         where: isEmail ?
//             { email: Identifier } : { mobile: Identifier }
//     })

//     if (CustomerInfo) {
//         res.status(200).json({ msg: "User Verification Succesfull", success: true, data: CustomerInfo })
//     } else {
//         res.status(200).json({ msg: "User Verification UnSuccesfull", success: false })
//     }




// }

const AddCart = async (req, res) => {
    try {

        console.log(req.body.productId)
        console.log(req.body.userId.UserId)
        try {

            const updatedData = await Customers.update(
                {
                    inCart: sequelize.literal(`array_append("inCart", ${req.body.productId})`),
                },
                {
                    where: { id: req.body.userId.UserId },
                    returning: true, // to get the updated record
                    plain: true, // to get only the updated data
                    raw: true, // to get the raw result
                    // Set additional options based on your requirements
                }
            );

            if (updatedData) {
                res.status(200).json({ msg: "Data Added In Cart Successfully", success: true })
            } else {
                res.status(500).json({ msg: "Data Not Added In Cart", success: false })
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }


    } catch (err) {
        console.log("ERROR FOUND:", err)
    }

}

const GetUserProduct = async (req, res) => {

    try {
        const userId = req.params.userId

        const userInfo = await Customers.findOne({
            where: { id: userId }
        })

        const userCartProducts = userInfo.dataValues.inCart

        const CartShowProducts = await Products.findAll({
            where: { id: userCartProducts }
        })

        if (CartShowProducts) {
            res.status(200).json({ msg: "User Selected Product retrieve successfully", success: true, data: CartShowProducts })
        } else {
            res.status(500).json({ msg: "Didn't get user selected products", success: false })
        }
    } catch (err) {
        console.log("ERROR FOUND: ", err)
        res.status(500).json({ msg: "Error Found", success: false })
    }

}

module.exports = { Authentication, Register, Login, GetProductData, GetProduct, AddCart, GetUserProduct } 