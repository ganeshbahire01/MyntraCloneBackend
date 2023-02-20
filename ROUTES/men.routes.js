const express = require("express");
const { DataModel } = require("../MODEL/data.model");

const mensroutes = express.Router();

mensroutes.get("/", async (req, res) => {
  try {
    const data = await DataModel.find({
      ideal_for: "Men",
    });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

mensroutes.get("/:id", async (req, res) => {
  const mensbyid = { _id: req.params.id };
  const idealfor = { ideal_for: "Men" };
  try {
    const data = await DataModel.find({ $and: [mensbyid, idealfor] });
    if (data.length > 0) {
      res.send(data);
    } else {
      res.send("data not found in MENS Collection");
    }
  } catch (error) {
    res.send(error);
  }
});

mensroutes.patch("/:id", async (req, res) => {
  try {
    await DataModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send("data updated Collection");
  } catch (error) {
    res.send(error);
  }
});

mensroutes.delete("/:id", async (req, res) => {
  try {
    await DataModel.findByIdAndDelete({ _id: req.params.id });
    res.send("data deleted Collection");
  } catch (error) {
    res.send(error);
  }
});

mensroutes.post("/addmens", async (req, res) => {
  try {
    const data = new DataModel(req.body);
    await data.save();
    res.send("data added Collection");
  } catch (error) {
    res.send(error);
  }
});
module.exports = {
  mensroutes,
};
