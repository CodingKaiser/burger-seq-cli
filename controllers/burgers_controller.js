var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  burger.all((data) => {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", (req, res) => {
  burger.create([
    "burger_name", "devoured", "date"
  ], [
    req.body.burger, req.body.devoured, ((new Date()) + "").split("(").slice(0, 1)[0].trim()
  ], () => {
    res.redirect("/");
  });
});

router.put("/:id", (req, res) => {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, () => {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
