const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Models
const BookInstance = require('./models/BookInstance'); 
const Author = require('./models/Author'); 

const port = 8000;

// MongoDB Connection
const mongoDB = 'mongodb://127.0.0.1:27017/my_library_db';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => {
  console.log('Connected to database');
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Route to display home page
app.get('/home', (_, res) => {
  // Home logic here...
});

// Route to get available books
app.get('/available', (_, res) => {
  
  BookInstance.find({ status: 'available' })
    .populate('book', 'title') 
    .then(bookInstances => {
      const availableBooks = bookInstances.map(bi => ({ title: bi.book.title, status: bi.status }));
      res.json(availableBooks);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route to get all authors with their names and lifespans
app.get('/authors', (_, res) => {
  
  Author.find({})
    .then(authors => {
      const authorDetails = authors.map(author => ({ name: author.name, lifespan: author.lifespan }));
      res.json(authorDetails);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
