require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("path : " + req.path);
  console.log("method : " + req.method);
  next();
});

app.use(cookieParser());
//routers
app.get("/", (req, res) => {
  res.json({ msg: "This is the home page of the fitness application" });
});
app.use("/api/user", userRoutes);
app.use("/", workoutRoutes);

const port = process.env.PORT;
//connecting to database
mongoose
  .connect(process.env.MongoDB_database)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
      console.log("database is connected");
    });
  })
  .catch((err) => console.log(err.message));
