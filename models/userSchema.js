const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    mobileno: {
        type: Number,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    }
});

const UserCollection = mongoose.model("UserCollection", userSchema);

module.exports = UserCollection;