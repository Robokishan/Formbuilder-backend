const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const formAnswersSchema = new Schema({
    form_id: {
        type: String,
        required: true,
    },
    answers: {

    }
})
 
module.exports = mongoose.model('FormAnswers',formAnswersSchema)