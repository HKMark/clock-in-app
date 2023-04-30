'use strict'
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: 'acuser',
  account_role: 'admin',
  employee_id: 1,
  job_title: 'Manager',
  department: 'CEO Office',
  work_address: 'Taipei 101'
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: await bcrypt.hash(SEED_USER.password, 10),
      account_role: SEED_USER.account_role,
      employee_id: SEED_USER.employee_id,
      job_title: SEED_USER.job_title,
      department: SEED_USER.department,
      work_address: SEED_USER.work_address,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
