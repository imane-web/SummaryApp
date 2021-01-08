const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

/*var videoSchema = new Schema({
    duration:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    img_miniature:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
*/

var summarySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
   /* 
    summaryVideo: {
        type: videoSchema,
        required: true
    }*/
}, {
    timestamps: true
});

var Summaries = mongoose.model('summary', summarySchema);

module.exports = Summaries;