const express = require('express');
const cors = require('cors');
const { green } = require('colors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json);
app.use(cors());

app.listen(port, console.log('Server connected.', green));
