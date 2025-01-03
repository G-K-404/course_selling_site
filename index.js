const express = require("express");
require('dotenv').config();
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { mongoose } = require("mongoose");
const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);

let connect = process.env.mongo_connection_string;
async function main(){
    await mongoose.connect(connect);
    app.listen(3000);
    console.log(connect);
}

main();

