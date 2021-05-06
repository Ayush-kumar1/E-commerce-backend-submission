const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    wishlist: Boolean,
    inStock: Boolean,
    fastDelivery: Boolean,
    quantity: Number,
    image: String
});


const Product = mongoose.model("Product", ProductSchema);


module.exports = { Product }