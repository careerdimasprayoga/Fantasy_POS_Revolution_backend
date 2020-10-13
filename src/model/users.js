const connection = require('../config/mysql')

module.exports = {
    post_user: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users SET ?", setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: result.insertId,
                        ...setData
                    }
                    delete newResult.password
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, check_user: (email) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE email = ?", email, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}