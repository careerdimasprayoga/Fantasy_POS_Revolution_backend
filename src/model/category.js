const connection = require("../config/mysql");

module.exports = {

    getCategory: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT id as category_id, name as category_name FROM categorys", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, getCategoryById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM categorys WHERE id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }, postCategory: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO categorys SET ?", setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, patchCategory: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE categorys SET ? WHERE id = ?", [setData, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        category_id: id
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM categorys WHERE id = ?", id, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: id
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }

}
