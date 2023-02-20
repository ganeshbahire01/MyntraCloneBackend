const express = require("express");
const { DataModel } = require("../MODEL/data.model");

const Womensroutes = express.Router();

Womensroutes.get("/", async (req, res) => {
  try {
    const data = await DataModel.find({
      ideal_for: "Women",
    });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

Womensroutes.get("/:id", async (req, res) => {
  const Womensbyid = { _id: req.params.id };
  const idealfor = { ideal_for: "Women" };
  try {
    const data = await DataModel.find({ $and: [Womensbyid, idealfor] });
    if (data.length > 0) {
      res.send(data);
    } else {
      res.send("data not found in WomenS Collection");
    }
  } catch (error) {
    res.send(error);
  }
});

Womensroutes.patch("/:id", async (req, res) => {
  try {
    await DataModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send("data updated Collection");
  } catch (error) {
    res.send(error);
  }
});

Womensroutes.delete("/:id", async (req, res) => {
  try {
    await DataModel.findByIdAndDelete({ _id: req.params.id });
    res.send("data deleted Collection");
  } catch (error) {
    res.send(error);
  }
});

Womensroutes.post("/addwomen", async (req, res) => {
  try {
    const data = new DataModel(req.body);
    await data.save();
    res.send("data added Collection");
  } catch (error) {
    res.send(error);
  }
});
module.exports = {
  Womensroutes,
};
