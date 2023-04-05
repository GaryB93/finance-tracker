const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://garybalogh93:JnYYnDdiOA9FyzJo@cluster0.3u25ma1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'financeData'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'users' collection
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  monthlyData: {
    jan2023: {income: [
                { 
                  description: '',
                  amount: ''
                }
              ],
              expenses: [
                {
                  description: '',
                  amount: ''
                }
              ]
            }
  }
});

const User = mongoose.model('user', userSchema);