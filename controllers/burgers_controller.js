// Import the model (burger.js) to use its database functions.
var db = require("../models");

module.exports = function(app) {

  // GET route for retrieving Burgers
  app.get("/", (req, res) => {
    console.log(db);
    db.burgers_seq.findAll({}).then((data) => {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  // POST route for saving a new Burger
  app.post("/", (req, res) => {
    db.burgers_seq.create({
      burger_name: req.body.burger,
      devoured: req.body.devoured,
    }).then(() => {
      res.redirect("/");
    });
  });

  // PUT route for consuming Burgers.
  app.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    db.burgers_seq.update({
      devoured: req.body.devoured,
    }, {
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.redirect("/");
    });
  });
};
