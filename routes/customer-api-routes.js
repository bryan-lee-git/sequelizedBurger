let db = require("../models");

module.exports = function(app) {
    app.get("/customers", (req, res) => {
        db.Customer.findAll({
            include: db.Burger
        }).then(customerData => {
            let hbsObject = {
                customers: customerData
            }
            res.render("customers", hbsObject);
        });
    });

    app.get("/api/customers", (req, res) => {
        db.Customer.findAll({
            include: db.Burger
        }).then(customer => {
            res.json(customer);
        });
    });
    
    app.get("/api/customers/:id", (req, res) => {
        db.Customer.findOne({
            include: db.Burger,
            where: {
                id: req.params.id
            }
        }).then(customer => {
        res.json(customer);
        });
    });
    
    app.post("/api/customers", (req, res) => {
        db.Customer.create(req.body).then(customer => {
            res.json(customer);
        });
    });
    
    app.delete("/api/customers/:id", (req, res) => {
        db.Customer.destroy({
            where: {
                id: req.params.id
            }
        }).then(customer => {
            res.json(customer);
        });
    });
}


