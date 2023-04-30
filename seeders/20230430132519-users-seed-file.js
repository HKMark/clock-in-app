'use strict'
const bcrypt = require('bcryptjs')

const SEED_USERS = [
  {
    name: 'root',
    email: 'root@example.com',
    password: 'acuser',
    account_role: 'admin',
    employee_id: 1,
    job_title: 'Manager',
    department: 'CEO Office',
    work_address: 'Taipei 101'
  },
  {
    name: 'user1',
    email: 'user1@example.com',
    password: 'acuser',
    account_role: 'user',
    employee_id: 2,
    job_title: 'Assistant',
    department: 'CEO Office',
    work_address: 'Taipei 101'
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await Promise.all(SEED_USERS.map(async user => ({
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      account_role: user.account_role,
      employee_id: user.employee_id,
      job_title: user.job_title,
      department: user.department,
      work_address: user.work_address,
      created_at: new Date(),
      updated_at: new Date()
    })))

    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
