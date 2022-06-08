"use strict" ;

var mongoose = require("mongoose") ;
const { Schema } = mongoose ;

const adminSchema = new Schema({
    _id: Schema["Types"].ObjectId,
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema, "admins") ;

exports.Admin = Admin;
