const mongoose = require("mongoose");

const dbConnection = () => {
  // connect to te db
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected : ${conn.connection.host}`);
  });
};
module.exports = dbConnection;
