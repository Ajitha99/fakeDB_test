//CRUD actions
const e = require('express');
const db = require('./db');
const Employee = require('./models/employee');
const { faker } = require('@faker-js/faker');
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// finds all employees

const findAll = async () => {
    const allEmp = await Employee.find({})
    console.log(allEmp);
}
//creates one employee
const createOneEmp = async () => {
  const createEmp = new Employee({
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
  });
  await createEmp.save();
  console.log("Created Employee!");
}
// creates three employees
const createManyEmp = async () => {

  const employees = [...Array(3)].map(employee => (
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
  console.log("Created three employees!")
}
// update one employee
const updateEmp = async () => {
  const updateAnEmp = await Employee.updateOne({ email: "Oleta_Gibson53@gmail.com" }, { email: "Oleta_Changed@gmail.com" });
  console.log(updateAnEmp);
}
// delete an employee
const deleteEmp = async () => {
  const deleteOneEmp = await Employee.deleteOne({ first_name: "Ariane" });
  console.log(deleteOneEmp);
}
// return a list of all employees' full names (first_name + last_name)
const empFullName = async () =>{
  //gets all the records and filters and returns only first_name and last_name since their values are 1;
  //by default, it returns _id but here we need only full name so by _id value 0 then _id is ommited from
  // the result.
  const eFullName = await Employee.find({},{first_name: 1, last_name: 1, _id:0});
  // console.log(eFullName);
  //console.log(eFullName.length);
  for(let i = 0; i < eFullName.length; i++){
      console.log(`${eFullName[i].first_name} ${eFullName[i].last_name}`)
  }
 
}

const run = async () => {
  //  await findAll();
  //  await createOneEmp();
  //  await createManyEmp();
  //  await updateEmp();
  //  await deleteEmp();
   await empFullName(); 
  db.close()
}


run()

