const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const errorHandler = require('./app/v1/middleware/errorHandler.js')
const routes = require('./app/index.router.js')
const connectDB  = require("./app/v1/config/dbConnection.js");
const { app, server }  = require("./app/v1/socket/chat.socket.js");

dotenv.config();

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(_dirname, "../frontend/dist/index.html"))
  );
}

server.listen(PORT, async () => {
  console.log("Server is running on PORT:", PORT);
  await connectDB();
});
