const express = require("express");
const { connection } = require("./db");
const { DataModel } = require("./MODEL/data.model");
const { mensroutes } = require("./ROUTES/men.routes");
const { userRoutes } = require("./ROUTES/user.routes");
const { Womensroutes } = require("./ROUTES/womens.routes");
require("dotenv").config();
const app = express();
app.use(express.json());
// app.get("/", async (req, res) => {
//   try {
//     const data = await DataModel.find();
//     // console.log("data", data);
//     res.send(data);
//   } catch (error) {}
// });
app.use("/user", userRoutes);
app.use("/mens", mensroutes);
app.use("/women", Womensroutes);

app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
  } catch (error) {}
});
