//First you require() mongoose, then use the Schema constructor
// to create a new schema instance
const mongoose = require('mongoose');

//we are trying to bring in the structure property 
const Schema = mongoose.Schema;

//Schema for Address
const Address = new Schema({
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true}
})

const Employee = new Schema(
//now we are going to write the structure of our database
//remember: our databases are objects- starts with object { }
//Schema is a blue-print for database
{
    first_name: { type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    job_title: {type: String, required: true},
    address: Address
},
{timestamps: true},//any edit, the timestamp will be added
)


module.exports = mongoose.model('employees', Employee);
