const mysql = require("mysql");
const db = require("../../config");

const dataMapperFavorites = {
  getAllFavorites: (callback) => {
    const sql = "SELECT * FROM favorite";
    db.query(sql, callback);
  },

  postFavorite: (favoriteData, callback) => {
    let sql = "INSERT INTO ?? SET ?";
    const inserts = ["favorite", favoriteData];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

};

module.exports = dataMapperFavorites;
