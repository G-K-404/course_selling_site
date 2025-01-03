const mongoose = require("mongoose");
const { number } = require("zod");
let objectId = mongoose.Types.ObjectId;
let Schema = mongoose.Schema;

const users = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName : String,
    lastName: String
});

const admin = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName : String,
    lastName: String
});
const courses = new Schema({
    title: {type: String, unique: true},
    description: String,
    price: Number,
    imageurl: String,
    creatorId: objectId
});
const purchases = new Schema({
    userid: objectId,
    courseid: objectId
});

const usermodel = mongoose.model("users", users);
const coursemodel = mongoose.model("courses", courses);
const adminmodel = mongoose.model("admins", admin);
const purchasesmodel = mongoose.model("purchases", purchases);

module.exports = {
    usermodel: usermodel,
    coursemodel: coursemodel,
    adminmodel: adminmodel,
    purchasesmodel: purchasesmodel
};