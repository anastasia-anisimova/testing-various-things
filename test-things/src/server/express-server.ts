import {Application, Request, Response} from "express";
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
import * as jwt from 'jsonwebtoken';
// import fs from 'fs';
const express = require('express');
const fs = require('fs');
const app: Application = express();
//const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

const loginRoute = (req: Request, res: Response) => {

  const email = req.body.login;
  const password = req.body.password;

  debugger
 //if (validateEmailAndPassword()) {
  if (true) {
    // const userId = findUserIdForEmail(email);
    //
    // const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
    //   algorithm: 'RS256',
    //   expiresIn: 120,
    //   subject: userId
    // }
    //
    // // send the JWT back to the user
    // // TODO - multiple options available
  }
  else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }

  app.use(bodyParser.json());

  app.post('*', loginRoute)
  app.route('/api/login')
    .post(loginRoute);

  app.listen(3000, '127.0.0.1', () => {
    debugger
  });
}
