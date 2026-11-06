const express = require("express");
const app = express();
const db = require("./db"); //connection with database


app.use(express.json());
app.get("/", function (req, res) {
  res.send("welcome to my hotel ... how can i help you ");
});

const personRoutes = require("./Routes/personRoutes");
app.use("/person", personRoutes);

const menuRoutes = require("./Routes/menuRoutes");
app.use("/menuItems", menuRoutes);


app.listen(3000, () => {
  console.log("listening to port 3000");
});
