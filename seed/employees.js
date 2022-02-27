const db = require('../db');
const Employee = require('../models/employee');
// const faker = require('faker');
const { faker } = require('@faker-js/faker');
db.on('error',console.error.bind(console,'MangoDB connection error:'))

const main = async () =>{
    const employees = [...Array(100)].map(employee => (
        {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            job_title: faker.name.jobTitle(),
            address: {
                street: faker.address.streetName(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode()
            }
        }
    ))

    await Employee.insertMany(employees);
    console.log("Created employees!");
   
}

const run = async () =>{
    await main();
    db.close();
}

run();