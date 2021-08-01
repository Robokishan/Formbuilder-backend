const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const formAnswersSchema = new Schema({
    form_id: {
        type: String,
        required: true,
    },
    answers: {

    }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
 
module.exports = mongoose.model('FormAnswers',formAnswersSchema)