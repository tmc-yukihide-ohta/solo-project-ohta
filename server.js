const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()
const knex = require("./db/knex");
const port = process.env.PORT || 8080
const app = express();
const cors = require("cors");
const buildPath = path.join(__dirname, './build')

// body-parserミドルウェアを使用してリクエストのボディをパース
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use(express.static(buildPath))
app.use(cors())

app.listen(port, () => {
    console.log(`Server is running ${port} !`);
})

// app.use((req, res, next) => {
//     console.log("----------------req_info------------------");
//     console.log('Request URL:', req.url);
//     console.log('Request Method:', req.method);
//     console.log('Request Headers:', req.headers);
//     console.log('Request Query Parameters:', req.query);
//     console.log('Request Body:', req.body);
//     console.log("------------------------------------------")
//     console.log("")
//     next();
// });

const allPurchase = () => {
    return knex
        .select({
            id: "id",
            timestamp: "timestamp",
            content: "item_name",
            isStriked: "strike_line",
            registrationDate: "registration_date",
            purchaseDate: "purchase_date"
        })
        .from("purchase");
};


app.get("/api/purchaseitems", async (req, res) => {
    console.log("get受信")
    const allPurchaseArr = await allPurchase();

    res.status(200).json(allPurchaseArr);
})

app.post("/api/purchaseitems", async (req, res) => {
    console.log("post受信")
    const postData = req.body;
    console.log(postData);
    const mytimestamp = getTimestamp();
    const postFunc = (timestamp, itemName, strikeLine) => {
        console.log("63行:", timestamp, itemName, strikeLine)
        return knex("purchase")
            .insert({
                "timestamp": timestamp,
                "item_name": itemName,
                "strike_line": strikeLine,
                "registration_date": mytimestamp
            })
            .then(() => {
                console.log('データの更新が完了しました');
            })
            .catch((err) => {
                console.error('データの更新中にエラーが発生しました:', err);
            })
    }
    await postFunc(postData.timestamp, postData.itemName, postData.strikeLine);
    const allPurchaseArr = await allPurchase();
    console.log(allPurchaseArr);
    res.status(200).json(allPurchaseArr);
})

app.patch("/api/purchaseitems", async (req, res) => {
    console.log("patch受信")
    // const patchData = req.body;
    // console.log(patchData);
    // const timestamp = getTimestamp();
    // const postFunc = (timestamp, strikeLine) => {
    //     return knex("purchase")
    //         .insert({
    //             "timestamp": timestamp,
    //             "strike_line": strikeLine,
    //             "purchase_date": timestamp
    //         })
    //         .then(() => {
    //             console.log('データの更新が完了しました');
    //         })
    //         .catch((err) => {
    //             console.error('データの更新中にエラーが発生しました:', err);
    //         })
    // }
    // await postFunc(patchData.timestamp, patchData.strikeLine);
    // const allPurchaseArr = await allPurchase();
    // console.log(allPurchaseArr);
    // res.status(200).json(allPurchaseArr);
    res.status(200);
})


const getTimestamp = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; //末尾から2文字抽出
    const day = now.getDate();

    const timestamp = `${year}-${month}-${day}`;
    return timestamp;
};