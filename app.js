const express = require("express");
const morgan = require("morgan");

const PORT = 5000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
//const verifyToken = require("./middleware/AutheMiddleware");

//database configuration
const { connect_database } = require("./db/connect");
connect_database();

//base routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" }).sendStatus(200);
});

// routes imports
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
