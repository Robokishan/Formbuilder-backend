const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type: String, unique: true 
    },
    name: {
        type: String,
        required: true
    },
    user_name :{ 
        type: String,
        required: true, 
        unique: true 
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User',userSchema)