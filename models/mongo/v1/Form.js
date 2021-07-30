const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const formSchema = new Schema({
    user_id: {
        type: String,
        rquired: true
    },
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    form: {
        
    }
})
 
module.exports = mongoose.model('Form',formSchema)