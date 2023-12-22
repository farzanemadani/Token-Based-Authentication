import fs from 'fs';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
var events = JSON.parse(fs.readFileSync('./db/events.json'));
var app = express();
app.use(cors());
var server = app.listen(3000, listening);

function listening() {
  console.log("listening...");
}

app.use(express.static('public'));
app.use(express.json()); // to parse JSON data in the request body

function verifyToken(req, res, next) {
  // Get the token from the header
  const token = req.headers['authorization'];

  // Check if the token exists
  if (!token) {
    // Send a 403 status code (forbidden)
    return res.sendStatus(403);
  }

  // Extract the actual token value without the "Bearer " prefix
  const tokenValue = token.replace('Bearer ', '');

  // Verify the token using the secret key
  jwt.verify(tokenValue, 'the_secret_key', (err, decoded) => {
    // Check if there is an error
    if (err) {
      // Send a 401 status code (unauthorized)
      return res.sendStatus(401);
    }

    // Pass the decoded data to the next middleware
    req.decoded = decoded;
    next();
  });
}

// app.get('/dashboard', getEvents); // to get the events data
// function getEvents(req, res) {
//   res.send(events);
// }

app.get('/dashboard', verifyToken, (req, res) => {
  // send the events data and the user data as JSON
  res.json({...events , user: req.decoded});
});


app.post('/dashboard', addEvent); // to add a new event



function addEvent(req, res) {
  const newEvent = req.body;
  events.push(newEvent);
  fs.writeFile('events.json', JSON.stringify(events), finished); // to update the events.json file
  function finished(err) {
    if (err) {
      console.error(err);
      res.status(500).send("Error writing to file");
    } else {
      console.log("Success");
      res.send(newEvent);
    }
  }
}

app.post("/register", (req, res) => {
  if (req.body) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // You'll want to encrypt the password in a live app
    }

    const data = JSON.stringify(user, null, 2)

    fs.writeFile("./db/user.json", data, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Added user to user.json")
      }
    })
    // The secret key should be an environment variable in a live app
    const token = jwt.sign({ user }, "the_secret_key")
    res.json({
      token,
      email: user.email,
      name: user.name,
    })
  } else {
    res.sendStatus(401)
  }
})

app.post("/login", (req, res) => {
  if (req.body) {
    const user = {
      email: req.body.email,
      password: req.body.password,
      // You'll want to encrypt the password in a live app
    }

    const data = JSON.stringify(user, null, 2)

    fs.writeFile("./db/user.json", data, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Added user to user.json")
      }
    })
    // The secret key should be an environment variable in a live app
    const token = jwt.sign({ user }, "the_secret_key")
    res.json({
      token,
      email: user.email,
      name: user.name,
    })
  } else {
    res.sendStatus(401)
  }
})