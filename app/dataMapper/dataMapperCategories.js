const mysql = require("mysql");
const db = require("../../config");

const dataMapperCategories = {
  getAllCategories: (callback) => {
    const sql = "SELECT * FROM category";
    db.query(sql, callback);
  },

  getCategoryById: (categoryId, callback) => {
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    const inserts = ['category', 'id', categoryId];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },
};

module.exports = dataMapperCategories;
