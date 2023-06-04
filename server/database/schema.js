const mongoose = require('mongoose')

const lostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:Buffer,
        contentType:String,
        // required:true
    },
    contentType:{
        type:String
    },
    createdDate:{
        type: Date,
        default:Date.now,
    },
    foundAt:{
        type:String,
        default:'Gitam Hyderabad'
    },
    description:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
})


const lostObj = mongoose.model('LostObj',lostSchema)

module.exports = lostObj