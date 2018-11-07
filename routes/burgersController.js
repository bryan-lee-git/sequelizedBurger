let db = require("../models");

module.exports = function(app) {
    app.get("/", (req, res) => {
        db.Burger.findAll({}).then(data => {
            let hbsObject = { burgers: data };
            res.render("index", hbsObject);
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
            eaten: req.body.eaten
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).end();
        });
    });
    
    app.delete("/api/burgers/:id", (req, res) => {
        let condition = `id = ${req.params.id}`;
        burger.delete(condition, (result) => {
            if (result.affectedRows == 0) return res.status(404).end();
            else res.status(200).end();
        });
    });
}


