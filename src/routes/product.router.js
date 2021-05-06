const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model")
const { extend } = require("lodash")


router.route("/")
    .get(async(req, res) => {
        try {
            const products = await Product.find({});
            res.json({ success: true, products })
        } catch (err) {
            res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
        }

    })
    .post(async(req, res) => {
        try {
            const product = req.body;
            const NewProduct = new Product(product);
            const savedProduct = await NewProduct.save();
            res.json({ success: true, product: savedProduct })
        } catch (err) {
            res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
        }
    })


router.param("productId", async(req, res, next, productId) => {
    try {
        // Step Two: Getting the product using `findById`
        const product = await Product.findById(productId);

        if (!product) { // Step Three: Validating and sending error
            return res.status(400).json({ success: false, message: "error getting product" })
        }

        req.product = product; // Step Four: Putting it in req object
        next(); // Step Five: Calling next(), to invoke the route handler
    } catch {
        res.status(400).json({ success: false, message: "error while retrieving the product" })
    }
})





router.route("/:productId")
    .get((req, res) => {
        let { product } = req;
        product.__v = undefined;
        res.json({ success: true, product })


    })
    .post(async(req, res) => {
        const productUpdates = req.body;
        let { product } = req;

        product = extend(product, productUpdates);
        product = await product.save();

        res.json({ success: true, product })
    })
    .delete(async(req, res) => {
        let { product } = req;

        await product.remove();

        product.deleted = true;
        res.json({ success: true, product })
    })


module.exports = router