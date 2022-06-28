const mysql = require('mysql');
const db = require('../../config');

const dataMapperOffers = {
  getAllOffers: (callback) => {
    const sql = 'SELECT * FROM annonces';
    db.query(sql, callback);
  },

  getOfferById: (offerId, callback) => {
    let sql = `SELECT
      a.*, c.name AS category_name, u.firstname, u.lastname
      FROM annonces AS a
      JOIN category AS c ON c.id = a.category_id
      JOIN users AS u ON u.id = a.users_id WHERE a.id = ?`;
    const inserts = [offerId];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

  postOffer: (offerData, callback) => {
    let sql = 'INSERT INTO ?? SET ?';
    const inserts = ['annonces', offerData];
    sql = mysql.format(sql, inserts);
    db.query(sql, [offerData], callback);
  },

  updateOffer: (updateOfferData, offerId, callback) => {
    let sql = 'UPDATE ?? SET ? where ?? = ?';
    const inserts = ['annonces', updateOfferData, 'id', offerId];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },

  deleteOffer: (offerId, callback) => {
    let sql = 'DELETE FROM ?? WHERE ?? = ?';
    const inserts = ['annonces', 'id', offerId];
    sql = mysql.format(sql, inserts);
    db.query(sql, callback);
  },
};

module.exports = dataMapperOffers;
