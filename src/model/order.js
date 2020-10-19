const connection = require("../config/mysql");

module.exports = {
  getOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT historys.invoice as invoices, 'Dimas Prayoga' as cashier, historys.date as dates, GROUP_CONCAT(products.name) as names, historys.subtotal as subtotals from historys LEFT JOIN orders on orders.id_history = historys.id LEFT JOIN products on products.id = orders.id_product GROUP BY(invoices)",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  today_income: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(subtotal) as subtotals FROM historys WHERE DATE_FORMAT(date, "%Y-%m-%d") = CURRENT_DATE() `,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  total_order: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as totals from orders",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  total_yearIncome: (this_year) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(subtotal) AS subtotals FROM historys WHERE YEAR(date) >= YEAR${
          "('" + this_year + "')"
        }`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  this_month: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DATE(date) as dates, sum(subtotal) as subtotals FROM historys WHERE MONTH(date) = MONTH(NOW()) AND YEAR(date) = YEAR(NOW()) GROUP BY DATE(date)",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  last_month: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT DATE(date) as dates, sum(subtotal) as subtotals FROM historys WHERE MONTH(date) = MONTH(NOW() -INTERVAL "1" MONTH) AND YEAR(date) = YEAR(NOW()) GROUP BY DATE(date)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postOrder: (dataOrder) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO orders SET ?",
        dataOrder,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
              ...dataOrder,
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
