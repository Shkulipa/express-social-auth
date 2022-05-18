
require('dotenv').config();
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("./passport");
const authRouter = require("./routers/auth");
const app = express();

app.use(cookieSession({
  name: "session",
  keys: ["lama"],
  maxAge: 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on the ${process.env.PORT} Port`);
})