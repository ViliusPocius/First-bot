const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        money: Number,
        timer: Date,
    });


module.exports = mongoose.model('Users', userSchema);