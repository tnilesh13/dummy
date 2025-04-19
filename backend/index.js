const express = require("express");
const http = require("http");
const errorHandler = require("./app/v1/middleware/errorHandler");
const connectDb = require("./app/v1/config/dbConnection");
require('dotenv').config()
const routes = require('./app/indexRouter')
const {setupSocket} = require('./app/v1/utils/socket')
const cors = require('cors')

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// app.use(cors())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use('/api', routes)
app.use(errorHandler);

const server = http.createServer(app);
const io = setupSocket(server);


// app.listen(port, () => {
server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
