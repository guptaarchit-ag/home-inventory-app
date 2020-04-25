const Knex = require('knex');

const bcrypt = require('bcrypt');
const orderedTableNames = require('../../src/constants/orderedTableNames');
const tableNames = require('../../src/constants/tableNames');
const crypto = require('crypto');
const countries = require('../../src/constants/countries');

/**
 * @param {Knex} knex
*/


exports.seed = async (knex) => {
  await orderedTableNames
    .reduce(async(promise, table_name) => {
      await promise;
      console.log('Clearing',table_name);
      return knex(table_name).del();
    }, Promise.resolve());

  const password = crypto.randomBytes(15).toString('hex');
    
  const user = {
    email: 'guptaarchit.ag@gmail.com',
    name: 'Archit Gupta',
    password: await bcrypt.hash(password, 12),
  }
  
  const [createdUser] = await knex(tableNames.user)
    .insert(user)
    .returning('*');

  console.log('User Created:',{
    password,
  },createdUser);
  
  await knex(tableNames.country).insert(countries);
  await knex(tableNames.state).insert([{
    name: 'CO',
  }]);
  
};
