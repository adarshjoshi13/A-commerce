const { Sellers, Products, Categories, Orders } = require('../models/index')
const { sequelize } = require('../models/index');
const fs = require('fs').promises;
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config(process.env.CLOUDINARY_URL)

const SellerInfo = async (req, res) => {
    try {
        const SellerId = req.params.SellerId

        const seller = await Sellers.findOne({
            raw: true,
            where: { id: SellerId }
        })


        if (!seller) {
            return res.status(404).json({ msg: "Seller not found", success: false });
        }

        const categories = await Categories.findAll({
            raw: true
        })

        const products = await Products.findAll({
            raw: true,
            where: { id: seller.products }
        })

        const orders = await Orders.findAll({
            raw: true,
            where: { SellBy: seller.id }
        })

        const data = {
            SellerInfo: seller,
            categories: categories,
            products: products,
            orders: orders
        }

        res.status(200).json({ msg: "Seller information retrieved successfully", data: data, success: true });

    } catch (Err) {
        console.log("Error Found While Getting Seller Info", Err)
        res.status(500).json({ msg: `Fail To Get Seller Info: ${Err}`, success: false });
    }
}

const AddProduct = async (req, res) => {

    try {
        const { productName, productDescription, productPrice, productCategory, SellerId } = req.body;

        const productPhotos = req.files;

        const folderPath = './uploads'

        const uploadToCloudinary = (photo) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(photo.path, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                });
            });
        };

        const uploadPhotosToCloudinary = async (productPhotos) => {
            try {
                const cloudinaryUrls = await Promise.all(
                    productPhotos.map((photo) => uploadToCloudinary(photo))
                );

                async function removeAllFilesInFolder(folderPath) {
                    try {
                        const files = await fs.readdir(folderPath);

                        await Promise.all(files.map(async (file) => {
                            const filePath = path.join(folderPath, file);
                            await fs.unlink(filePath);
                        }));
                    } catch (error) {
                        console.error('Error removing files:', error);
                    }
                }
                removeAllFilesInFolder(folderPath);

                if (cloudinaryUrls) {

                    const AddProduct = await Products.create({
                        catId: productCategory,
                        reviewId: 0,
                        sellBy: SellerId,
                        name: productName,
                        description: productDescription,
                        price: productPrice,
                        images: [...cloudinaryUrls]
                    })
                    if (AddProduct.dataValues) {
                        const productId = AddProduct.dataValues.id;
                        const updateSeller = await Sellers.update({
                            products: sequelize.literal(`array_append("products", ${productId})`),
                        }, {
                            where: { id: SellerId },
                        });
                        if (updateSeller) {
                            res.status(200).json({ success: true, message: 'Product Add successfully' });
                        }

                    } else {
                        res.status(500).json({ success: true, message: 'Unccessfull To Add Product! ' });
                    }
                }
            } catch (error) {
                console.error('Error uploading photos to Cloudinary:', error);
            }
        };

        uploadPhotosToCloudinary(productPhotos);

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const GetListedProducts = async (req, res) => {
    try {
        const ProductIds = req.query.productIds
        const ProductsList = await Products.findAll({
            raw: true,
            where: { id: ProductIds },
            order: [['createdAt', 'DESC']]
        });

        if (ProductsList) {
            res.status(200).json({ msg: `Successfully Get Products List`, success: true, data: ProductsList });
        } else {
            res.status(200).json({ msg: `Unsuccessfull To Get Products List`, success: false });
        }

    } catch (Err) {
        console.log("Error Found While Getting Listed Products", Err)
        res.status(500).json({ msg: `Fail To Get Seller Listed Products: ${Err}`, success: false });
    }
}

const RemoveFromProductList = async (req, res) => {
    try {
        const { ProductId, SellerId } = req.body

        const deletedProduct = await Products.destroy({
            where: { id: ProductId }
        });

        if (deletedProduct) {
            const updatedSellerInfo = await Sellers.update(
                { products: sequelize.literal(`array_remove("products", ${ProductId})`) },
                { where: { id: SellerId } });

            if (updatedSellerInfo[0] === 1) {
                res.status(200).json({ msg: `Product Successfully Removed`, success: true });
            } else {
                res.status(500).json({ msg: `Unsuccessfull To Removed Product`, success: false });
            }


        }

    } catch (Err) {
        console.log("Error Found While Removing Product From List", Err)
        res.status(500).json({ msg: `Fail To Remove Product From List: ${Err}`, success: false });
    }
}

module.exports = { SellerInfo, AddProduct, GetListedProducts, RemoveFromProductList } 