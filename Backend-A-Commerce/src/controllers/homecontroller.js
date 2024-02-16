
const { Customers, Products } = require('../models/index')
const { sequelize } = require('../models/index');
require('dotenv').config();


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
            res.status(500).json({ msg: "Product Not Found!!", success: false })
        }

    } catch (err) {
        console.log("Error Found Whille Getting Product", err)
        res.status(500).json({ msg: "Fail To Get!!", success: false })
    }

}

const AddCart = async (req, res) => {

    try {

        const updateUserData = await Customers.update(
            {
                inCart: sequelize.literal(`array_append("inCart", ${req.body.productId})`),
            },
            {
                where: { id: req.body.userId }
            }
        );

        if (updateUserData) {
            res.status(200).json({ msg: "Data Added In Cart Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Data Not Added In Cart", success: false })
        }
    } catch (error) {
        console.error('Error updating customer cart:', error);
    }

}

const GetUserCart = async (req, res) => {

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

const RemoveFromCart = async (req, res) => {
    try {
        let ProductId = req.body.productId
        let UserId = req.body.userId

        const updatedCustomer = await Customers.update(
            { inCart: sequelize.literal(`array_remove("inCart", ${ProductId})`) },
            { where: { id: UserId } }
        );

        if (updatedCustomer) {
            res.status(200).json({ msg: "Product Remove From Cart Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Product Not Removed From Cart", success: false })
        }
    } catch (Err) {
        console.log("Error Found While Removing From User Cart", Err)
        res.status(500).json({ msg: "Fail to remove From User Cart", success: false })
    }

}

const AddWishlist = async (req, res) => {
    try {

        const updateUserData = await Customers.update(
            {
                inWishlist: sequelize.literal(`array_append("inWishlist", ${req.body.productId})`),
            },
            {
                where: { id: req.body.userId }
            }
        );

        if (updateUserData) {
            res.status(200).json({ msg: "Data Added In Wishlist Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Data Not Added In Wishlist", success: false })
        }
    } catch (Err) {
        console.log("Error Found While Adding In User Wishlist", Err)
        res.status(500).json({ msg: "Fail to add in user wishlist", success: false })
    }

}

const GetUserWishlist = async (req, res) => {

    try {
        const userId = req.params.userId
        const userInfo = await Customers.findOne({
            where: { id: userId }
        })

        const userWishlistProducts = userInfo.dataValues.inWishlist

        const WishlistShowProducts = await Products.findAll({
            where: { id: userWishlistProducts }
        })


        if (WishlistShowProducts) {
            res.status(200).json({ msg: "User Wishlist Product retrieve successfully", success: true, data: WishlistShowProducts })
        } else {
            res.status(500).json({ msg: "Didn't get user wishlist products", success: false })
        }
    } catch (err) {
        console.log("Error Found While Getting User Wishlist", Err)
        res.status(500).json({ msg: "Fail to get user wishlist", success: false })
    }
}

const RemoveFromWishlist = async (req, res) => {
    try {
        let ProductId = req.body.productId
        let UserId = req.body.userId

        const updatedCustomer = await Customers.update(
            { inWishlist: sequelize.literal(`array_remove("inWishlist", ${ProductId})`) },
            { where: { id: UserId } }
        );

        if (updatedCustomer) {
            res.status(200).json({ msg: "Product Remove From Cart Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Product Not Removed From Cart", success: false })
        }
    } catch (Err) {
        console.log("Error Found While Removing From Wishlist", Err)
        res.status(500).json({ msg: "Fail to remove from wishlist", success: false })
    }

}


module.exports = { GetProductData, GetProduct, AddCart, GetUserCart, RemoveFromCart, AddWishlist, GetUserWishlist, RemoveFromWishlist } 