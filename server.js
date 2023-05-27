const express = require('express');
const app = express();
const fs = require('fs/promises');
const bodyParser = require('body-parser');

// Parse JSON request body
app.use(bodyParser.json());

app.get('/listUsers', async (req, res) => {
  try {
    const data = await fs.readFile(__dirname + '/users.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(__dirname + '/users.json', 'utf8');
    const users = JSON.parse(data);
    const user = users[`user${req.params.id}`];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/addUser', async (req, res) => {
  try {
    const data = await fs.readFile(__dirname + '/users.json', 'utf8');
    const users = JSON.parse(data);
    const newUser = req.body;
    const userId = `user${Object.keys(users).length + 1}`;
    users[userId] = newUser;
    await fs.writeFile(__dirname + '/users.json', JSON.stringify(users, null, 2), 'utf8');
    res.status(200).send('User added successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const data = await fs.readFile(__dirname + '/users.json', 'utf8');
    const users = JSON.parse(data);
    const user = users[`user${req.params.id}`];
    if (user) {
      delete users[`user${req.params.id}`];
      await fs.writeFile(__dirname + '/users.json', JSON.stringify(users, null, 2), 'utf8');
      res.status(200).send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

const server = app.listen(8081, () => {
  const { address, port } = server.address();
  console.log(`Server running at http://${address}:${port}`);
});
