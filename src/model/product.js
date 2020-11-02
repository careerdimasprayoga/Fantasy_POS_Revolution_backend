const connection = require("../config/mysql");

module.exports = {
  getTotalProducts: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM products`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProduct: (limit, offset, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT products.id as id, categorys.name as category_name, categorys.id as category_id, products.name as name, products.image as image, products.price as price, products.created as created, products.updated, products.status FROM products INNER JOIN categorys on products.id_category = categorys.id WHERE products.status = 1 ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductManage: (limit, offset, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT products.id as id, categorys.name as category_name, categorys.id as category_id, products.name as name, products.image as image, products.price as price, products.created as created, products.updated, products.status FROM products INNER JOIN categorys on products.id_category = categorys.id ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  searchProduct: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM products WHERE name LIKE "%${search}%"`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  sortProduct: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM products ORDER BY ${sort}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductOrderName: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products ORDER BY name ASC LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductOrderCategory: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products ORDER BY id_category ASC LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductOrderDate: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products ORDER BY created ASC LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductOrderPrice: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products ORDER BY price ASC LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM products WHERE status=1",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getProductCountManage: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM products",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postProduct: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO products SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET ? WHERE id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM products WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
