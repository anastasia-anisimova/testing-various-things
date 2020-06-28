const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_Secret = 'secret_key';
const testUser = { login: 'a', password: '1234'};

// *************** API methods **************//

app.get('/', function (req, res) {
  res.send('App is started :)');
});

app.get('/user', function (req, res) {
  res.send(testUser);
});

app.post('/api/authenticate', (req, res) => {

  if (req.body) {
    let user = req.body;
    console.log(user)

    if (testUser.login === req.body.login && testUser.password === req.body.password) {
      let token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signed_user: user,
        token: token
      });
    } else {
      res.status(403).send({
        errorMessage: 'Authorisation required!'
      });
    }
  } else {
    res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  }

});


// *************** END API methods **************//

app.listen(5000, () => console.log('My auth server started on port 5000'));
