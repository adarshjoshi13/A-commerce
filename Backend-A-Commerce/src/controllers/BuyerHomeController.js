
const { Buyers, Products, Categories, PurchaseSteps, Orders, Sellers } = require('../models/index')
const { sequelize } = require('../models/index');
const { Op } = require('sequelize');
require('dotenv').config();


const GetProductData = async (req, res) => {

    try {
        let CategoryId = req.params.catId

        const AllProducts = await Products.findAll({
            where: { catId: CategoryId }
        })


        if (AllProducts) {
            res.status(200).json({ msg: "Successfull To Find All Products Data!!", status: false, ProductsData: AllProducts })
        } else {
            res.status(500).json({ msg: "Fail To Find All Products Data!!", status: false })
        }
    } catch (Err) {
        console.log("Error Found Whille Find All Products Data", err)
        res.status(500).json({ msg: "Fail To Find All Products Data!!", status: false })
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

    } catch (Err) {
        console.log("Error Found While Finding Product", Err)
        res.status(500).json({ msg: "Fail To Find Product!!", success: false })
    }

}

const GetUserCart = async (req, res) => {

    try {
        const userId = req.params.BuyerId

        const userInfo = await Buyers.findOne({
            where: { id: userId }
        })

        const userCartProducts = userInfo.dataValues.inCart
        const CartShowProducts = await Products.findAll({
            where: { id: userCartProducts }
        })

        if (CartShowProducts) {
            res.status(200).json({ msg: "Successfull To Retrieve User Cart Products", success: true, data: CartShowProducts })
        } else {
            res.status(500).json({ msg: "Unsuccessfull To Retrieve User Cart Products", success: false })
        }
    } catch (Err) {
        console.error('Error Found While Retrieve User Cart Products:', Err);
        res.status(500).json({ msg: "Fail To Retrieve User Cart Products", success: false })
    }

}

const AddCart = async (req, res) => {

    try {
        const updateUserData = await Buyers.update(
            { inCart: sequelize.literal(`array_append("inCart", ${req.body.productId})`), },
            { where: { id: req.body.BuyerId } }
        );

        if (updateUserData) {
            res.status(200).json({ msg: "Product Added In Cart Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Product Not Added In Cart", success: false })
        }
    } catch (Err) {
        console.error('Error Found While Updating User Cart:', Err);
        res.status(500).json({ msg: "Fail To Update User Cart", success: false })
    }

}

const RemoveFromCart = async (req, res) => {
    try {
        let ProductId = req.body.productId
        let UserId = req.body.BuyerId

        const updatedCustomer = await Buyers.update(
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

const GetUserWishlist = async (req, res) => {

    try {
        const userId = req.params.BuyerId
        const userInfo = await Buyers.findOne({
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

    } catch (Err) {
        console.log("Error Found While Getting User Wishlist", Err)
        res.status(500).json({ msg: "Fail to get user wishlist", success: false })
    }
}

const AddWishlist = async (req, res) => {
    try {
        const userId = req.body.BuyerId
        const updateUserData = await Buyers.update(
            {
                inWishlist: sequelize.literal(`array_append("inWishlist", ${req.body.productId})`),
            },
            {
                where: { id: userId }
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

const RemoveFromWishlist = async (req, res) => {
    try {
        let ProductId = req.body.productId
        let UserId = req.body.BuyerId

        const updatedCustomer = await Buyers.update(
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

const GetCategories = async (req, res) => {

    try {

        const AllCategories = await Categories.findAll({
            attributes: ['id', 'name', 'image'],
            exclude: ['createdAt', 'updatedAt']
        })

        if (AllCategories) {
            res.status(200).json({ msg: "All categories selected", success: true, data: AllCategories })
        } else {
            res.status(500).json({ msg: "Categories not selected", success: false })
        }

    } catch (Err) {
        console.log("Error found while getting categories", Err)
        res.status(500).json({ msg: "Fail to select categories", success: false })
    }

}

const GetPurchaseSteps = async (req, res) => {
    try {

        const PurchaseStepsForms = await PurchaseSteps.findAll({
            order: [['id', 'ASC']]
        });

        if (PurchaseStepsForms) {
            res.status(200).json({ msg: "Succesfully Get All The Steps Form Of Purchase", success: true, StepsFormdata: PurchaseStepsForms })
        } else {
            res.status(500).json({ msg: "Unsuccesfully To Get All Steps Form", success: false })
        }
    } catch (Err) {
        console.log("Error Found While Getting Purchase Steps: ", Err)
        res.status(500).json({ msg: "Faild To Get All Steps Of Purchase", success: false })
    }
}

const ListProductOrder = async (req, res) => {
    ProductInfo = req.body
    // console.log(ProductInfo)
    try {

        const ListOrder = Orders.create({
            deliveryInfo: ProductInfo,
            orderedProduct: ProductInfo.productId,
            orderedBy: ProductInfo.BuyerId,
            SellBy: ProductInfo.sellerId
        })

        const updateBuyerData = await Buyers.update(
            { orders: sequelize.literal(`array_append("orders", ${ProductInfo.productId})`), },
            { where: { id: ProductInfo.BuyerId } }
        );

        const updateSellerData = await Sellers.update(
            { orders: sequelize.literal(`array_append("orders", ${ProductInfo.productId})`), },
            { where: { id: ProductInfo.sellerId } }
        );


        if (ListOrder) {
            res.status(200).json({ msg: "Product Order Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Product Not Orderd", success: false })
        }
    } catch (Err) {
        console.log("Error Found While Listing Order: ", Err)
        res.status(500).json({ msg: "Failed to order Product", success: false })
    }
}

const GetUserOrders = async (req, res) => {
    try {
        const userId = req.params.BuyerId
        const userInfo = await Buyers.findOne({
            where: { id: userId }
        })

        const userOrderedProducts = userInfo.dataValues.orders

        const OrderedProducts = await Products.findAll({
            where: { id: userOrderedProducts }
        })


        if (OrderedProducts) {
            res.status(200).json({ msg: "User Ordered Products retrieve successfully", success: true, data: OrderedProducts })
        } else {
            res.status(500).json({ msg: "Didn't get user Ordered Products", success: false })
        }

    } catch (Err) {
        console.log("Error Found While Getting User Orders", Err)
        res.status(500).json({ msg: "Fail to get user Orders", success: false })
    }
}

const CancelOrder = async (req, res) => {
    try {
        let ProductId = req.body.productId
        let UserId = req.body.BuyerId

        const updatedCustomer = await Buyers.update(
            { orders: sequelize.literal(`array_remove("orders", ${ProductId})`) },
            { where: { id: UserId } }
        );

        const updatedOrder = await Orders.destroy({
            where: { orderedProduct: ProductId }
        });

        if (updatedCustomer && updatedOrder) {
            res.status(200).json({ msg: "Order Cancelled Successfully", success: true })
        } else {
            res.status(500).json({ msg: "Order Not Cancelled Successfully", success: false })
        }
    } catch (Err) {
        console.log("Error Found While Removing From Orders", Err)
        res.status(500).json({ msg: "Fail to remove from orders", success: false })
    }

}

const GetRelatedSearchSuggestion = async (req, res) => {

    try {
        const searchedKey = req.params.searchedKey
        const ProductInfo = await Products.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${searchedKey}%`
                },
                description: {
                    [Op.iLike]: `%${searchedKey}%`
                }
            }
        });

        if (ProductInfo) {
            res.status(200).json({ msg: "Successfull To Retrieve Search Related Products", success: true, data: ProductInfo })
        } else {
            res.status(500).json({ msg: "Unsuccessfull To Retrieve Search Related Products", success: false })
        }
    } catch (Err) {
        console.error('Error Found While Retrieve Search Related Products:', Err);
        res.status(500).json({ msg: "Fail To Retrieve Search Related Products", success: false })
    }

}

const GetSearchedProducts = async (req, res) => {

    try {
        let searchedKey = req.params.searchedKey
        const { Op } = require('sequelize');

        const ProductsInfo = await Products.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${searchedKey}%`
                },
                description: {
                    [Op.iLike]: `%${searchedKey}%`
                }
            }
        });

        if (ProductsInfo) {
            res.status(200).json({ msg: "Successfull To Retrieve Searched Products", success: true, data: ProductsInfo })
        } else {
            res.status(500).json({ msg: "Unsuccessfull To Retrieve Searched Products", success: false })
        }
    } catch (Err) {
        console.error('Error Found While Retrieve Searched Products:', Err);
        res.status(500).json({ msg: "Fail To Retrieve Searched Products", success: false })
    }

}

const GetFilterProducts = async (req, res) => {

    try {
        let FilterKeys = req.query;

        const { Op } = require('sequelize');

        const sortingOrder = FilterKeys.sort === '0' ? 'ASC' : 'DESC';

        const ProductsInfo = await Products.findAll({
            raw: true,
            where: {
                name: {
                    [Op.iLike]: `%${FilterKeys.name}%`
                },
                description: {
                    [Op.iLike]: `%${FilterKeys.name}%`
                }
            },
            order: [['price', sortingOrder]]
        });

        if (ProductsInfo) {
            res.status(200).json({ msg: "Successfull To Retrieve Searched Products", success: true, data: ProductsInfo })
        } else {
            res.status(500).json({ msg: "Unsuccessfull To Retrieve Searched Products", success: false })
        }
    } catch (Err) {
        console.error('Error Found While Retrieve Searched Products:', Err);
        res.status(500).json({ msg: "Fail To Retrieve Searched Products", success: false })
    }

}


module.exports = { GetProductData, GetProduct, AddCart, GetUserCart, RemoveFromCart, AddWishlist, GetUserWishlist, RemoveFromWishlist, GetCategories, GetPurchaseSteps, ListProductOrder, GetUserOrders, CancelOrder, GetRelatedSearchSuggestion, GetSearchedProducts, GetFilterProducts } 