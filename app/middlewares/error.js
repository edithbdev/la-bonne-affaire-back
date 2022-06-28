const errorMiddleware = (err, req, res, next) => {
    return res.status(500).json({
      error: err.message,
      sql: err.sql,
    });
  };

  module.exports = errorMiddleware;
