let db = require("../models");

module.exports = function(app) {
    app.get("/burgers", (req, res) => {
        db.Burger.findAll({}).then(burgerData => {
            db.Customer.findAll({}).then(customerData => {
                let hbsObject = { burgers: burgerData, customers: customerData };
                res.render("burgers", hbsObject);
            })
        });
    });

    app.get("/api/burgers", (req, res) => {
        db.Burger.findAll({
            include: db.Customer
        }).then(data => {
            res.json(data);
        });
    });
    
    app.post("/api/burgers", (req, res) => {
        db.Burger.create(req.body).then(result => {
            res.json({ id: result.insertId });
        });
    });
    
    app.put("/api/burgers/:id", (req, res) => {
        console.log(req.body.eaten);
        db.Burger.update({
            eaten: req.body.eaten,
            CustomerId: req.body.eatenBy
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
    });
    
    app.delete("/api/burgers/:id", (req, res) => {
        console.log(req.params.id);
        let id = req.params.id;
        db.Burger.destroy({
            where: {
                id: id
            }
        }).then(result => {
            res.json(result);
        });
    });
}


