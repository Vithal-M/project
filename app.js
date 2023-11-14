const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/books", router); // localhost:5001/books

// Use environment variable for MongoDB connection string
const mongoDBConnectionString =
  process.env.MONGODB_CONNECTION_STRING ||
  "mongodb+srv://admin:eHGa8ydVcFvnw1uF985@cluster0.23w45g5.mongodb.net/?retryWrites=true&w=majority";

// Dynamic port configuration
const PORT = process.env.PORT || 5001; // Use a different port, for example, 5001

// Connect to the database
mongoose
  .connect(mongoDBConnectionString, { useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const router = require("./routes/book-routes");
// const app = express();

// //middleware
// // app.use("/", (req, res, next) => {
// //     res.send("This is our Starting app");
// // });
// app.use("/books", router);

// mongoose.connect(
//   "mongodb+srv://admin:eHGa8ydVcFvnw1uF@cluster0.23w45g5.mongodb.net/?retryWrites=true&w=majority"
// )
//     .then(() => console.log("connected to DATABASE"))
//     .then(() => {
//         app.listen(5000)
//     }).catch((err) => console.log(err));
