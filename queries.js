const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbtest',
  password: 'root',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM UserInfo', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
  const username = parseInt(request.params.username)

  pool.query('SELECT * FROM UserInfo WHERE username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
    const { username, password } = request.body
  
    pool.query('INSERT INTO UserInfo (username, password) VALUES ($1, $2) RETURNING *', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Username added with details: ${results.rows[0].username}`)
    })
}

const updateUser = (request, response) => {
    const username = parseInt(request.params.username)
    const { name, password } = request.body
  
    pool.query(
      'UPDATE UserInfo SET username = $1, password = $2 WHERE username = $1',
      [name, password],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${username}`)
      }
    )
}

const deleteUser = (request, response) => {
    const username = parseInt(request.params.username)
  
    pool.query('DELETE FROM users WHERE username = $1', [username], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${username}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}