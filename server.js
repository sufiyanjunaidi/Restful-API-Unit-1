const express = require('express');
const app = express();
const fs = require('fs');

// Read user data from JSON file
let userData = JSON.parse(fs.readFileSync('users.js'));

// API endpoint to retrieve a list of users
app.get('/users', (req, res) => {
  res.json(userData);
});

// API endpoint to add a new user
app.post('/addUser', (req, res) => {
  const newUser = req.body;
  userData[`user${Object.keys(userData).length + 1}`] = newUser;
  saveUserData();
  res.send('User added successfully!');
});

// API endpoint to get a user by ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = userData[`user${userId}`];
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found!');
  }
});

// API endpoint to delete a user by ID
app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = userData[`user${userId}`];
  if (user) {
    delete userData[`user${userId}`];
    saveUserData();
    res.send('User deleted successfully!');
  } else {
    res.status(404).send('User not found!');
  }
});

// Helper function to save user data to the JSON file
function saveUserData() {
  fs.writeFileSync('users.js', JSON.stringify(userData, null, 2));
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
