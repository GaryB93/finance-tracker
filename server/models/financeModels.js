const { Pool } = require('pg');

const PG_URI = 'postgres://fdgfwiww:Ct3mX77e8uVWx-u8cp-kND9dv3iS6svM@mahmud.db.elephantsql.com/fdgfwiww';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};