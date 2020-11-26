const express = require('express');
const routes = require('./routes');
const { errors } = require('celebrate');
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
// para carregar arquivos
//app.use (bodyParser.json ({limit: '10mb', extended: true}))


// fim carregar arquivos
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(routes);
app.use(errors());
// ff

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
