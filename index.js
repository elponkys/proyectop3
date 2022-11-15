require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/');
const db = require('./db');
const bodyParser = require('body-parser');
const {
	logErrors,
	errorHandler,
	boomErrorHandler,
} = require('./middlewares/error.handler');
const { DBURL } = require('./consts.json');
//HACEMOS LA CONEXIÓN
db(DBURL);

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json({limit: '999mb'}));
app.use(
	express.json({
		extended: false, // permite codificar matrices y objetos enriquecidos en formato codificado en url
	})
);
app.get('/', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
      dbo.collection("usuarios").collection().find({}, {"usuario": { $eq: username }},function(err, result) {
          if (err) throw err;
          if (result.length > 0) {
              req.session.loggedin = true;
              req.session.username = username;
              res.redirect('/home');
          } else {
              res.send('Incorrect Username and/or Password!');
          }
          res.end();
      });
  } else {
      res.send('Please enter Username and Password!');
      res.end();
  }
});
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(port, () => console.log('Mi puerto', port));
