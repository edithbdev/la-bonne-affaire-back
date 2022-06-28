const mysql = require("mysql");
const db = require("../../config");

const dataMapperUsers = {
  getAllUsers: (callback) => {
    const sql = "SELECT * FROM users";
    db.query(sql, callback);
  },

  getOneUser: (userId, callback) => {
    // version récuperation user sans mdp en SQL
    // let sql = `SELECT users.id,
    //   users.firstname,
    //   users.lastname,
    //   users.email,
    //   users.address,
    //   users.cp,
    //   users.region,
    //   users.city,
    //   users.phone
    //   FROM ? WHERE ?? = ?`

    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    const inserts = ["users", "id", userId];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

  getUserByEmail: (email, callback) => {
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    const inserts = ["users", "email", email];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

  getUsersFavorite: (userId, callback) => {
    let sql = `
    SELECT * FROM ?? AS a
    JOIN ?? AS f on ?? = ??
    WHERE ?? = ?`;
    const inserts = [
      "annonces",
      "favorite",
      "a.id",
      "f.annonces_id",
      "f.users_id",
      userId,
    ];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

  getUsersOffers : (userId, callback) => {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const inserts = ["annonces", "users_id", userId];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

  postUser: (userData, callback) => {
    let sql = "INSERT INTO ?? SET ?";
    const inserts = ["users", userData];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

};

module.exports = dataMapperUsers;
