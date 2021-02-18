const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        //ref:'Book',
        maxlength:50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath : {
        type: String,
    },
    categories : {
        type: Number,
    },
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })

videoSchema.index({
    title: 'text',
    description: 'text',
},{
    weights:{
        name: 5,
        description: 2,
    }
})


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }