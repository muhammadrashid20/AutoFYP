"use strict" ;

var mongoose = require("mongoose") ;
const { Schema } = mongoose ;

const AnnoucementSchema = new Schema({
    _id: Schema["Types"].ObjectId,
    AnnoucementFor : {
        type: String,
        required: true,
    },
    Title : {
        type: String,
        required: true,
    },
    details : {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Annoucement = mongoose.model('Annoucement', AnnoucementSchema, "Annoucements") ;

exports.Annoucement = Annoucement;
