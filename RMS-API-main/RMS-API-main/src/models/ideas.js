"use strict" ;

var mongoose = require("mongoose") ;
const { Schema } = mongoose ;

const IdeaSchema = new Schema({
    _id: Schema["Types"].ObjectId,
    GivenBY : {
        type: String,
        required: true,
    },
    // Title : {
    //     type: String,
    //     required: true,
    // },
    details : {
        type: String,
        required: true,
    },
    // Type : {
    //     type: String,
    //     required: true,
    // },
    Tooluse : {
        type: String,
        required: true,
    },
    knowledge : {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Ideas = mongoose.model('Idea', IdeaSchema, "Ideas") ;

exports.Ideas = Ideas;
