const express = require('express');
const dotenv = require('dotenv');
const knex = require("./db/knex");
const app = express();
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running ${port} !`);
})

app.get("/api/purchaseitems", async (req, res) => {
    console.log("get受信")
    const allPurchase = () => {
        return knex.select("*").from("purchase");
    };
    const allPurchaseArr = await allPurchase();
    res.status(200).json(allPurchaseArr);
})