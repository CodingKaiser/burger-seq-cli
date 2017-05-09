// Import the model (burger.js) to use its database functions.
var db = require("../models");

module.exports = function(app) {

  // GET route for retrieving Burgers
  app.get("/", (req, res) => {
    db.BurgersSeq.findAll({
      include: [db.Customer]
    }).then((data) => {
      var hbsObject = {
        burgers: data
      };
      if (hbsObject.burgers[0] && hbsObject.burgers[0].Customer) {
        console.log(hbsObject.burgers[0].Customer);
      }
      res.render("index", hbsObject);
    });
  });

  // POST route for saving a new Burger
  app.post("/", (req, res) => {
    db.BurgersSeq.create({
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
    db.Customer.findOrCreate({
      where: {
        name: req.body.consumer.trim()
      },
      defaults: {
        name: req.body.consumer.trim()
      }
    }).then((customer) => {
      console.log(customer);
      db.BurgersSeq.update({
        devoured: req.body.devoured,
        CustomerId: customer[0].dataValues.id,
      }, {
        where: {
          id: req.params.id
        }
      }).then(() => {
        res.redirect("/");
      });
    });
  });
};
